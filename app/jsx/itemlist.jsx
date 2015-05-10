"use strict";

var Player = new function() {
    var handle = null;

    this.start = function( func, millies){
        handle = setInterval( func, millies);
    };

    this.stop = function(){
        clearInterval(handle);
    };
};

var ControlPanel = React.createClass({

    propTypes : {
        frameMs : React.PropTypes.number.isRequired,
        onChange : React.PropTypes.func.isRequired
    },

    getInitialState : function(){
        return {isPaused : true, interval: 500, itemCount:100 }
    },

    changeItemCount : function(event){
        this.state.itemCount = +event.target.value;
        this.propagateChanges();
        this.forceUpdate();
    },

    changeInterval : function(event){
        this.state.interval = +event.target.value;
        this.propagateChanges();
        this.forceUpdate();
    },

    togglePause : function(){
        this.state.isPaused =  !this.state.isPaused;
        this.propagateChanges();
        this.forceUpdate();
    },



    propagateChanges : function(){
        this.props.onChange(this.state);
    },


    render : function(){
        return (
            <div>
                <div className="col-lg-1 center-vertical">
                    <img src="./images/reactlogo.svg" height="48"/>
                </div>
                <div className="col-lg-3 center-vertical">
                        <div className="row">
                            <label>No. Items</label>
                        </div>
                        <div className="row">
                            <input type="number" onChange={this.changeItemCount} value={this.state.itemCount}/>
                        </div>
                </div>
                <div className="col-lg-3 center-vertical">
                    <div className="row">
                        <label>Interval [ms]</label>
                    </div>
                    <div className="row">
                        <input type="number" onChange={this.changeInterval} value={this.state.interval}/>
                    </div>
                </div>

                <div className="col-lg-2 center-vertical">
                    <button type="button" onClick={this.togglePause} className="btn btn-success"><span
                        className={this.state.isPaused ? 'glyphicon glyphicon-play' : 'glyphicon glyphicon-pause'}
                        aria-hidden="true"></span>&nbsp;{this.state.isPaused?'Play':'Pause'}
                    </button>
                </div>

                <div className="col-lg-2 center-vertical">
                    <div className="row">
                        <label>Frame [ms]: {this.props.frameMs.toFixed(2)}</label>
                    </div>
                </div>
                <hr/>
            </div>
        )
    }
});


var Item = React.createClass({

    propTypes: {
        id: React.PropTypes.number.isRequired,
        text: React.PropTypes.string.isRequired
    },

    render: function () {
        return (
            <ul className="content-list-cards">
                <li className="card-item">
                    <a>
                        <span>
                            <strong>{this.props.id}</strong>
                        </span>
                        <span>
                            <small>{this.props.text}</small>
                        </span>
                    </a>
                </li>
            </ul>
        )
    }
});


var ItemList = React.createClass({

    _lastTime: 0,
    _frameMs: 0,

    getInitialState: function () {
        return {items: this.shuffle(100)};
    },

    componentDidMount: function () {
        this._lastTime = performance.now();

    },

    jsonEqual: function(a,b){
      return JSON.stringify(a) === JSON.stringify(b);
    },

    onControlChanged : function(control){

        Player.stop();
        if(!control.isPaused){
            Player.start(function(){
                this.setState({items:this.shuffle(control.itemCount)});
            }.bind(this),control.interval);
        }
    },

    reseed: function (itemCount) {
        var data = [];

        var now = performance.now();
        this._frameMs = now - this._lastTime;
        this._lastTime = now;

        for (var i = 0; i < itemCount; ++i) {
            data.push(
                {
                    id: Math.floor((Math.random() * itemCount)),
                    timestamp: performance.now()
                })
        }

        return data;
    },


    chunk: function (arr, size) {
        var newArr = [];
        for (var i = 0; i < arr.length; i += size) {
            newArr.push(arr.slice(i, i + size));
        }
        return newArr;
    },


    shuffle: function (itemCount) {
        var data = this.reseed(itemCount);
        return {count: data.length, rows: this.chunk(data, 3)};
    },

    render: function () {

        var items = this.state.items.rows.map(function (row, index) {
            return (
                <div key={index} className="row">
                    {
                        row.map(function (item, index) {
                            return (
                                <div className="col-lg-4">
                                    <ul className="content-list-cards">
                                        <Item key={index} id={item.id} text={item.timestamp}/>
                                    </ul>
                                </div>
                            )
                        })
                    }
                </div>
            )
        });


        return (
            <div>
                <ControlPanel frameMs={this._frameMs} onChange={this.onControlChanged}/>
                <div className="panel panel-default">
                    <div className="panel-body fixed-height">
                        {items}
                    </div>
                </div>
            </div>
        )
    }
});
app.value('ItemList', ItemList);