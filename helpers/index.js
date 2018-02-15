class Helpers {
    
    Utilities = {
        handle: function(roomID) {
            if (this.timerID !== null) {
                this.clear();
            }
            this.timerID = setTimeout(() => {
                this.changeRoom(roomID)
                this.clear();
            }, 5000);
        },
        clear: function() {
            clearTimeout(this.timerID);
            this.timerID = null;
        },
        timerID: null,
        changeRoom: (roomID) => {
            this.setState({
                currentRoom: roomID
            });
        }
    }
};

export default new Helpers();