import { Container, Logo } from './styles';

import logoImg from '@assets/skull3x.png';

export function Header() {
    return (
        <Container>
            <Logo source={logoImg}/>
        </Container>
    );
}