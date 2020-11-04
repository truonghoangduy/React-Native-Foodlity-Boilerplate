import React from 'react';
import { Component } from 'react'
import { FlatList, ImageURISource, StyleSheet, Text, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { DISHE } from '../model/dishes';
import { DISHES } from '../shared/dishes';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = (state: any) => {
    console.log("🔥🔥🔥🔥🔥🔥🔥")
    // console.log(state.dishesReducer)
    return {
        dishes: state.dishesReducer
    }
};

interface MenuSate {
    selectedDish: any
    dishes: any
}

interface IMenuProps {
    dishes: any
}

class Menu extends Component<IMenuProps> {
    constructor(props: any) {
        super(props)

        this.state = {
            selectedDish: {},
            dishes: this.props.dishes.dishes
        }


    }

    render() {
        if (this.props.dishes.isLoading) {
            return (<Loading />);
        } else if (this.props.dishes.errMess) {
            return (<Text>{this.props.dishes.errMess}</Text>);
        } else {
            return (
                // <Text>312312312</Text>
                // <FlatList data={this.props.dishes.dishes}
                //     renderItem={({ item, index }) => this.renderMenuItem(item, index)}
                //     keyExtractor={item => item.dish.id.toString()} />
                <View>
                    <FlatList data={this.props.dishes.dishes}
                        renderItem={({ item, index }) => this.renderMenuItem(item, index)}
                        keyExtractor={item => item.id.toString()} />

                    {/* <DishDetail dish={this.state.selectedDish.dish}></DishDetail> */}
                </View>
            )
        }

    }

    renderMenuItem(item: DISHE, index: number) {
        //@ts-ignore
        const { navigate } = this.props.navigation;


        return (
            <ListItem key={index} onPress={() => {
                navigate('Dishdetail', { dishId: item.id })
            }}>
                <Avatar source={{ uri: baseUrl + item.image }} />
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    };

    // onDishSelect(item:DISHE) {
    //     //alert(item.id);
    //     this.setState({ selectedDish: item });
    //   }


}

export default connect(mapStateToProps)(Menu);