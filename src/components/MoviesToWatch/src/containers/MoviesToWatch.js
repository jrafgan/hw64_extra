import React, {Component, Fragment} from 'react';
import './MoviesToWatch.css';
import InputForm from "../components/InputForm";
import imgUrl from '../assets/61848.png'
import ItemList from "../components/ItemList";
import axios from '../../../../axios-url';
import Preloader from "../../../Preloader/Preloader";


class MoviesToWatch extends Component {

    newText = '';
    state = {
        movies: [],
        loading: false,
    };


    shouldComponentUpdate(nextProps) {
        return this.props.movie === nextProps.movie && this.props.id === nextProps.id;
    }

    componentDidMount() {
        this.setState({loading: true});
        axios.get('movies.json').then(response => {
            if (response.data === null) return;
            let copy = this.state.movies;
            copy = Object.keys(response.data).map(id => {
                return {...response.data[id], id}
            });
            this.setState({movies: copy});
        }).finally(()=>{
            this.setState({loading: false})
        });

    }

    addBtn(e) {
        e.preventDefault();
        this.setState({loading: true});
        axios.post('movies.json', {movie: this.newText}).then(response => {
            let copy = this.state.movies;
            copy.push({movie: this.newText});
            this.setState({movies: copy});
        }).finally(()=>{
            this.setState({loading: false})
        });
    }

    addNewMovie(event) {
        this.newText = event.currentTarget.value;
    }

    editMovieName(event) {

        const id = event.currentTarget.id;
        const index = this.state.movies.findIndex(item => item.id === id);
        let copy = this.state.movies;
        copy[index].movie = event.currentTarget.value;
        this.setState({movies: copy, loading: true});
        axios.put('movies/' + id + '.json', {movie: copy[index].movie}).finally(()=>{
            this.setState({loading: false})
        });
    }

    deleteItem(event) {
        const id = event.currentTarget.id;
        const copy = this.state.movies;
        const index = copy.findIndex(item => item.id === id);
        copy.splice(index, 1);
        this.setState({movies: copy});
        this.setState({loading: true});
        axios.delete('movies/' + id + '.json').finally(()=>{
            this.setState({loading: false})
        });
    }


    render() {

        let form = (
            <Fragment>
            <div className="input-form">
                <InputForm onChangeName={this.addNewMovie.bind(this)} onSubmit={this.addBtn.bind(this)}/>
            </div>
            <div className="outcomeList">
            <p>List of Movies to Watch : </p>
        {this.state.movies.map((item, key) => {
            return <ItemList id={item.id} name={item.movie} imgUrl={imgUrl} key={key}
                             onClick={this.deleteItem.bind(this)} onChange={this.editMovieName.bind(this)}/>
        })}
    </div>
            </Fragment>
        );

        if (this.state.loading) {
            form = <Preloader />
        }
        return (
            <div className="App container">
                {form}
            </div>
        )
    }
}


export default MoviesToWatch;
