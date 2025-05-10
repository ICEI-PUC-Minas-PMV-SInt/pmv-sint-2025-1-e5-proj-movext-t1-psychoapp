import { View } from "react-native";

function Spacer({spaceWidth = 0, spaceHeight = 0}) {
  return (
    <View style={{width: spaceWidth, height: spaceHeight }}/>
  );
}

export default Spacer;