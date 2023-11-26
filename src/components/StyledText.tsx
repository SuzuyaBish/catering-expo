import { Text as MonoText, TextProps } from "./Themed";

export function Text(props: TextProps) {
  return (
    <MonoText
      {...props}
      style={[props.style, { fontFamily: "Inter_400Regular" }]}
    />
  );
}
