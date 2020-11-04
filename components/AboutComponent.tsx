import React, { Component } from "react";
import { View, Text, YellowBox } from "react-native";
import { Avatar, Card, ListItem } from "react-native-elements";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { LEADERS } from "../shared/leaders";
import { baseUrl } from '../shared/baseUrl';

import { connect } from 'react-redux';
import Loading from "./LoadingComponent";
const mapStateToProps = (state: any) => {
    // console.log("😲😲😲😲😲😲😲😲")
    // console.log(state)
    // console.log("😲😲😲😲😲😲😲😲")
    return {
        leaders: state.leadersReducer


    }
};


const listOfComponentText = [
    {
        title: "Our History",
        content: [
            "Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.",
            "The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.",
        ],
    },
];

function renderOurHistory(params?: any) {
    return (
        <Card>
            <Card.Title>{listOfComponentText[0].title}</Card.Title>
            <Card.Divider></Card.Divider>
            <View>
                {listOfComponentText[0].content.map((value) => {
                    return <Text key={value}>{value + "\n"}</Text>;
                })}
            </View>
        </Card>
    );
}

function renderLeader(leaderInfo: any, state: any) {

    if (state) {
        return (<Loading></Loading>)
    } else {
        console.log("Call")
        return (
            <ListItem key={leaderInfo.id}>
                <Avatar rounded source={{ uri: baseUrl + leaderInfo.image }} />
                <ListItem.Content>
                    <ListItem.Title>{leaderInfo.name}</ListItem.Title>
                    <ListItem.Subtitle>{leaderInfo.description}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    }

}


interface IAboutUsState {
    leaders: any;
}
class AboutUsComponent extends Component<IAboutUsState> {
    constructor(props: any) {
        super(props);
        // this.state = {
        //     leaders: LEADERS,
        // };
        YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']); // ref: https://forums.expo.io/t/warning-virtualizedlists-should-never-be-nested-inside-plain-scrollviews-with-the-same-orientation-use-another-virtualizedlist-backed-container-instead/31361/6

    }
    render() {
        return (
            <ScrollView>
                {renderOurHistory()}
                <View>
                    <Card>
                        <Card.Title>Corporate Leadership</Card.Title>
                        <Card.Divider></Card.Divider>
                        <FlatList
                            data={this.props.leaders.leaders}
                            renderItem={({ item }) => {
                                return renderLeader(item, this.props.leaders.isLoading);
                            }}

                        // keyExtractor={(item) => item.id.toString()}
                        ></FlatList>
                    </Card>
                </View>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(AboutUsComponent);
