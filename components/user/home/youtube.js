import React from "react";
import YouTube from "react-youtube";

export default class YoutubeVideo
    extends React.Component {
    render() {
        const opts = {
            height: "390",
            width: "640",
            playerVars: {
                autoplay: 1,
            },
        };

        return (
            <div className="col-12 col-sm-12">
                <h3>Cara Daftar Sebagai Mitra</h3>
                {/* <YouTube videoId="1EmHH-U4w18"
                    opts={opts} onReady={this._onReady} /> */}
            </div>
        );
    }

    _onReady(event) {
        event.target.pauseVideo();
    }
}
