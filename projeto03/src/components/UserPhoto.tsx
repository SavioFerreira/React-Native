import { Avatar  } from "native-base";
import { InterfaceAvatarProps } from "native-base/lib/typescript/components/composites/Avatar/types";

type Props = InterfaceAvatarProps & {
  size: number;
}
export function UserPhoto({size, ...rest}: Props) {
  return (
    <Avatar  
      w={size}
      h={size}
      rounded="full"
      borderWidth={2}
      borderColor="gray.400"
      {...rest}
    />
  );
}