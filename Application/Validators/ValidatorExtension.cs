using FluentValidation;

namespace Application.Validators
{
    public static class ValidatorExtension
    {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder
                .NotEmpty()
                .MinimumLength(6).WithMessage("Senha deve conter ao menos 6 caracteres")
                .Matches("[A-Z]").WithMessage("Senha deve conter ao menos 1 letra maiúscula")
                .Matches("[a-z]").WithMessage("Senha deve conter ao menos 1 letra minúscula")
                .Matches("[0-9]").WithMessage("Senha deve conter um número")
                .Matches("[^a-zA-A0-9]").WithMessage("Senha deve conter um caractér não alfanumérico");

            return options;

        }
    }
}