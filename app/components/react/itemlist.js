var ItemList = React.createClass({displayName: "ItemList",
    propTypes: {
        interval : React.PropTypes.number.isRequired,
        isPaused: React.PropTypes.bool.isRequired
    },
    render: function() {
        return React.createElement("span", null, "Interval is: ", this.props.interval, " - ", this.props.isPaused ? "Is Paused" : "Is Playing");
    }
});
app.value('ItemList', ItemList);