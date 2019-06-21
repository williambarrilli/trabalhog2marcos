import React, { Component } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native';
import { db, fb } from '../../utils/Firebase';

export default class Serie extends Component {
    constructor() {
        super()
        this.state = {
            series: [],
        }
    }
    readPedidos() {
        const { navigation } = this.props
        const serie = navigation.getParam('serieId', 0);
        db.ref(`/seriesDB/series/${serie}`)
            .on('value', snapchot => {
                if (snapchot.val() != null) {
                    this.setState(
                        {
                            series: Object.entries(snapchot.val())
                                .map(item => ({ ...item[1], id: item[0] }))
                            , carregando: false
                        })
                }
            })
        console.log(this.state.series)
        this.listPedidos();

    }
    listPedidos() {
        let item = this.state.series;
        if (item) {
            return <View style={styles.flatview}>
                <View style={styles.titleText}>
                    <Text >
                        Titulo: {item.titulo}
                    </Text>
                    <Text >
                        Genêro: {item.genero}
                    </Text>
                    <Text >
                        Nota: {item.nota}
                    </Text>
                    <Text >
                        Descricao: {item.descricao}
                    </Text>
                </View>
                <View>
                    <Button
                        title={"Deletar Pedido"}
                        color='rgb(255, 0, 0)'
                    />
                </View>
            </View>

        }
    }
    componentDidMount() {
        this.readPedidos();

    }
    render() {
        const listPedidos = this.listPedidos();

        return (
            <View>
                {listPedidos}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        margin: 10,

    },
    input: {
        margin: 20,
        marginTop: 15,
        marginVertical: 5,
        borderWidth: 0.5
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    text: {
        fontWeight: 'bold',
        margin: 20,
        marginTop: 15,
        marginVertical: 5,

    },
    button: {
        paddingTop: 5,
        // marginLeft: ,
        marginRight: 40,

    },
    flatview: {
        paddingTop: 5,
        paddingLeft: 0,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#c3c9cc',
        width: '90%',
        // marginLeft: "5%",
        // marginRight: "5%",
        marginTop: 10,
    },
    flatItens: {
        marginTop: 10,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#c3c9cc',
    },
});