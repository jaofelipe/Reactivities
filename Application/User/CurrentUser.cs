using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.User
{
    public class CurrentUser
    {
        public class Query : IRequest<User> { }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly UserManager<AppUser> _userManager;

            private readonly IUserAccessor _userAccessor;

            private readonly IJwtGenerator _jwtGenerator;

            public Handler(
                UserManager<AppUser> userManager,
                IUserAccessor userAccessor,
                IJwtGenerator jwtGenerator
            )
            {
                _userManager = userManager;
                _userAccessor = userAccessor;
                _jwtGenerator = jwtGenerator;
            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var user =
                    await _userManager
                        .FindByNameAsync(_userAccessor.GetCurrentUsername());

                    
                return new User {
                    DisplayName = user.DisplayName,
                    UserName = user.UserName,
                    Token = _jwtGenerator.CreateToken(user),
                    Image = null
                };

                
            }
        }
    }
}
