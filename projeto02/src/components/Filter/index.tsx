import { TouchableOpacityProps } from 'react-native';

import { Container, Title, FilterStyleProps} from './styles';

type Props = FilterStyleProps & {
    Title: string;

}

export function Filter({Title, isActive , ...rest }: Props) {
    return (
        <Container {...rest}>
            <Title> </Title>
        </Container>
    );
}
