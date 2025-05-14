// https://stackoverflow.com/questions/65481226/react-native-alert-alert-only-works-on-ios-and-android-not-web
import { Alert, Platform } from 'react-native'

const alertPolyfill = (title, description, options, extra) => {
    const result = window.confirm([title, description].filter(Boolean).join('\n'))

    if (result) {
        const confirmOption = options && options.find(({ style }) => style !== 'cancel')
        confirmOption && confirmOption.onPress()
    } else {
        const cancelOption = options && options.find(({ style }) => style === 'cancel')
        cancelOption && cancelOption.onPress()
    }
}

const alert = Platform.OS === 'web' ? alertPolyfill : Alert.alert

const CustomAlert = {
    alert: Platform.OS === 'web' ? alertPolyfill : Alert.alert
}

export { CustomAlert as Alert }