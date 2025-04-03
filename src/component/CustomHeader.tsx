import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

interface HeaderProps {
    title: string;
    showBackButton: boolean;
    rightIcon?: string;
    onRightPress?: () => void;
    navigation: any; // Add navigation prop

}

const CustomHeader: React.FC<HeaderProps> = ({ title = "",
     navigation ,
    showBackButton = true, rightIcon, onRightPress }) => {

    return (
        <View style={styles.container}>
            {/* Back Button or Menu Button */}
            <TouchableOpacity
                onPress={
                    () => {
                        if (showBackButton) {
                            navigation.goBack()
                        } else {
                            navigation.toggleDrawer()
                        }
                    }
                }
                style={styles.backButton}
            >
                <Icon name={showBackButton ? "arrow-back" : "menu"} size={24} color="white" />
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.title}>{title}</Text>

            {/* Right Icon (Optional) */}
            {rightIcon && onRightPress ? (
                <TouchableOpacity onPress={onRightPress} style={styles.rightButton}>
                    <Icon name={rightIcon} size={24} color="white" />
                </TouchableOpacity>
            ) : (
                <View style={styles.placeholder} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 60,
        backgroundColor: "#007AFF",
        paddingHorizontal: 15,
    },
    backButton: {
        padding: 8,
    },
    rightButton: {
        padding: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
    },
    placeholder: {
        width: 32, // Keeps layout balanced
    },
});

export default CustomHeader;
