import React, {Component} from 'react';

class ItemList extends Component {

    shouldComponentUpdate(nextProps) {
        return this.props.name !== nextProps.name;
    }

    render () {

        return (
            <div className="item" id={this.props.id}>
                <input id={this.props.id} onChange={(event)=>this.props.onChange(event)} value={this.props.name}/>
                <div className="btn-div"><img className="btn-img" id={this.props.id} src={this.props.imgUrl} alt="btn" onClick={(event)=>this.props.onClick(event)}/></div>
            </div>
        );
    }

};

export default ItemList;