var ItemList = React.createClass({
    propTypes: {
        interval : React.PropTypes.number.isRequired,
        isPaused: React.PropTypes.bool.isRequired
    },
    render: function() {
        return <span>Interval is: {this.props.interval} - {this.props.isPaused ? "Is Paused" : "Is Playing"}</span>;
    }
});
app.value('ItemList', ItemList);