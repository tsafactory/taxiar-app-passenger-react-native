import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen, Text, TextField } from "../components"
import { spacing, colors } from "../theme"

// @ts-ignore
export const CreateCarsScreen: FC<StackScreenProps<AppStackScreenProps, "CreateCars">> = observer(
  function CreateCarsScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()
    const [carBrand, setCardBrand] = useState("")

    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["top"]}>
        <Text text="Creating New Cards" />
        <TextField
          onChangeText={(value) => setCardBrand(value)}
          style={{ color: colors.palette.secondary500 }}
          value={carBrand}
          label="Auto Marca"
          placeholder="Auto Marca"
          testID="cardBrand"
        />
        <Text preset="bold" text="Calidad" />
      </Screen>
    )
  },
)

const $container: ViewStyle = {
  paddingTop: spacing.large + spacing.extraLarge,
  paddingHorizontal: spacing.large,
}
