import React, { Component } from "react";
import { View, Text } from "react-native";
import { Card } from "react-native-elements";

interface IContactUsState {
    componentText: Array<string>;
}

class ContactUsComponent extends Component<{}, IContactUsState> {
    constructor(props: any) {
        super(props);
        this.state = {
            componentText: [
                "121, Clear Water Bay Road",
                "Clear Water Bay, Kowloon",
                "HONG KONG",
                "Tel: +852 1234 5678",
                "Fax: +852 8765 4321",
                "Email:confusion@food.net",
            ],
        };
    }
    render() {
        return (
            <Card>
                <Card.Title>Contact Information</Card.Title>
                <Card.Divider></Card.Divider>
                {this.state.componentText.map((value) => {
                    return <Text key={value}>{value}</Text>;
                })}
            </Card>
        );
    }
}
export default ContactUsComponent;
