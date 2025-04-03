import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
// import { Ionicons  from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface CustomModalProps {
    isVisible: boolean;
    title: string;
    message: string;
    onClose: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ isVisible, title, message, onClose }) => {
    return (
        <Modal isVisible={isVisible} onBackdropPress={onClose} animationIn="fadeIn" animationOut="fadeOut">
            <View style={styles.modalContainer}>
                {/* Close Button */}
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Icon name="close" size={24} color="black" />
                </TouchableOpacity>

                {/* Title */}
                <Text style={styles.title}>{title}</Text>

                {/* Message */}
                <Text style={styles.message}>{message}</Text>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        position: "relative",
    },
    closeButton: {
        position: "absolute",
        top: 10,
        right: 10,
        padding: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        textAlign: "center",
    },
});

export default CustomModal;
