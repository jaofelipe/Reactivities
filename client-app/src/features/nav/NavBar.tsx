import React from 'react'
import { Menu, Button, Container } from 'semantic-ui-react'


export const NavBar = () => {
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header>
                    <img src="/asset/logo.png" alt="logo" style={{ marginRight: 10 }} />
                </Menu.Item>
                <Menu.Item  name='Activities'
                />
                <Menu.Item>
                    <Button positive content="Create Activity" />
                </Menu.Item>
            </Container>
        </Menu>
    )
}

