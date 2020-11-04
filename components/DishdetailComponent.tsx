import React, { Component } from 'react';
import { View, Text, YellowBox } from 'react-native';
import { Card, Image, Icon, ThemeConsumer } from 'react-native-elements';
import { DISHE } from '../model/dishes';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments'
import { FlatList, ScrollView } from 'react-native-gesture-handler';

import { postFavorite } from '../redux/ActionCreator';
import { connect } from 'react-redux';


const mapStateToProps = (state: any) => {
    return {
        dishes: state.dishesReducer.dishes,
        comments: state.commentsReducer.comments,
        favorites: state.favoritesReducer
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    postFavorite: (dishId: number) => dispatch(postFavorite(dishId))
});


// WARPPER
interface IRenderDishProps {
    dish: typeof DISHES[0]
    favorite: boolean
    onFav: Function
}
export class RenderDish extends Component<IRenderDishProps> {
    constructor(props: any) {
        super(props)
    }
    render() {
        let destructData = { ...this.props.dish };
        //@ts-ignore
        if (destructData != null) {
            return (
                <Card>
                    <Image source={require('./images/zucchipakoda.png')} style={{ width: '100%', height: 100, flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Card.FeaturedTitle>{destructData.name}</Card.FeaturedTitle>
                    </Image>
                    <Text style={{ margin: 10 }}>{destructData.description}</Text>
                    <Icon raised reverse name={this.props.favorite ? 'heart' : 'heart-o'}
                        type="font-awesome" color='#f50'
                        onPress={() => this.props.favorite ? alert("Already Fav ❤️") : this.props.onFav()}
                    ></Icon>
                </Card>
            );
        }

        return (<View></View>);

    }
}


// Props ans index
interface IDishDetailState {
    dishes: typeof DISHES;
    comments: typeof COMMENTS;
    favorites: Array<number>;
}

interface IDishDetailProps {
    favorites: Array<any>
    dishes: typeof DISHES;
    comments: typeof COMMENTS;

}
class DishDetail extends Component<IDishDetailProps, IDishDetailState>{
    constructor(props: any) {
        super(props)

        // BADLY CODE
        // this.state = {
        //     // dishes: DISHES,
        //     // comments: COMMENTS,
        //     // favorites: []

        // }
        YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);


    }
    render() {
        //@ts-ignore
        const distID = parseInt(this.props.route.params.dishId);
        const favorite = this.props.favorites.some((el) => el === distID);

        return (
            <ScrollView>
                <RenderDish dish={(this.props.dishes[distID])}
                    onFav={() => this.makeFavorite(distID)}
                    favorite={favorite}></RenderDish>
                <RenderComments commnent={this.props.comments.filter((comment) => comment.dishId == distID)}></RenderComments>

            </ScrollView>

        );
    }
    makeFavorite(dishID: number) {
        // @ts-ignore
        this.props.postFavorite(dishID);
        // this.setState({
        //     favorites: this.state.favorites.concat(dishID)
        // })
    }
}


interface IRenderCommentsProps {
    commnent: typeof COMMENTS
}


export class RenderComments extends Component<IRenderCommentsProps, {}> {
    constructor(props: any) {
        super(props)
    }
    render() {
        return (
            <Card>
                <Card.Title><Text>Commnent</Text></Card.Title>
                <FlatList data={this.props.commnent}
                    renderItem={({ item, index }) => this.renderEachComment(item)}
                    keyExtractor={item => item.id.toString()}
                ></FlatList>
            </Card>
        )
    }

    renderEachComment(comment: typeof COMMENTS[0]) {
        return (
            <View key={comment.id}>
                <Text style={{ fontSize: 14 }}>{comment.comment}</Text>
                <Text style={{ fontSize: 14 }}>{comment.rating}</Text>
                <Text style={{ fontSize: 14 }}>{'--' + comment.author + "," + comment.date}</Text>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail)


