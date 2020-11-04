export interface DISHE_INFO {

}

export interface IComment {
    id: number,
    dishId: number,
    rating: number,
    comment: string,
    author: string,
    date: string
}

export interface DISHE {

    id: number,
    name: string,
    image: string,
    category: string,
    label: string,
    price: string,
    featured: boolean,
    description: string

}