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

var ControlPanel = React.createClass({displayName: "ControlPanel",

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
            React.createElement("div", null, 
                React.createElement("div", {className: "col-lg-1 center-vertical"}, 
                    React.createElement("img", {src: "./images/reactlogo.svg", height: "48"})
                ), 
                React.createElement("div", {className: "col-lg-3 center-vertical"}, 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("label", null, "No. Items")
                        ), 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("input", {type: "number", onChange: this.changeItemCount, value: this.state.itemCount})
                        )
                ), 
                React.createElement("div", {className: "col-lg-3 center-vertical"}, 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("label", null, "Interval [ms]")
                    ), 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("input", {type: "number", onChange: this.changeInterval, value: this.state.interval})
                    )
                ), 

                React.createElement("div", {className: "col-lg-2 center-vertical"}, 
                    React.createElement("button", {type: "button", onClick: this.togglePause, className: "btn btn-success"}, React.createElement("span", {
                        className: this.state.isPaused ? 'glyphicon glyphicon-play' : 'glyphicon glyphicon-pause', 
                        "aria-hidden": "true"}), " ", this.state.isPaused?'Play':'Pause'
                    )
                ), 

                React.createElement("div", {className: "col-lg-2 center-vertical"}, 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("label", null, "Frame [ms]: ", this.props.frameMs.toFixed(2))
                    )
                ), 
                React.createElement("hr", null)
            )
        )
    }
});


var Item = React.createClass({displayName: "Item",

    propTypes: {
        id: React.PropTypes.number.isRequired,
        text: React.PropTypes.string.isRequired
    },

    render: function () {
        return (
            React.createElement("ul", {className: "content-list-cards"}, 
                React.createElement("li", {className: "card-item"}, 
                    React.createElement("a", null, 
                        React.createElement("span", null, 
                            React.createElement("strong", null, this.props.id)
                        ), 
                        React.createElement("span", null, 
                            React.createElement("small", null, this.props.text)
                        )
                    )
                )
            )
        )
    }
});


var ItemList = React.createClass({displayName: "ItemList",

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
                React.createElement("div", {key: index, className: "row"}, 
                    
                        row.map(function (item, index) {
                            return (
                                React.createElement("div", {className: "col-lg-4"}, 
                                    React.createElement("ul", {className: "content-list-cards"}, 
                                        React.createElement(Item, {key: index, id: item.id, text: item.timestamp})
                                    )
                                )
                            )
                        })
                    
                )
            )
        });


        return (
            React.createElement("div", null, 
                React.createElement(ControlPanel, {frameMs: this._frameMs, onChange: this.onControlChanged}), 
                React.createElement("div", {className: "panel panel-default"}, 
                    React.createElement("div", {className: "panel-body fixed-height"}, 
                        items
                    )
                )
            )
        )
    }
});
app.value('ItemList', ItemList);