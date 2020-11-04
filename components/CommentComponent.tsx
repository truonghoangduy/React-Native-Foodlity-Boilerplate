import React, { Component } from "react";
import { View } from "react-native";
import { Avatar, Card, ListItem } from "react-native-elements";
import {IComment} from '../model/dishes';


class CommentComponent extends Component<IComment>{
    render(){
        return (
            <Card>
                <View>
                    <Avatar source={require('./images/alberto.png')}></Avatar>

                </View>
            </Card>
        );
    }
}