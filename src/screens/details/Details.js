import React, { Component } from 'react';
import Header from '../../common/header/Header';
import Typography from '@material-ui/core/Typography';
import './Details.css';
import YouTube from 'react-youtube';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Link } from 'react-router-dom';

class Details extends Component {
    constructor() {
        super();
        this.state = {
            movie: {
                genres: [],
                trailer_url: "",
                artists: []
            },
            starIcons: [{
                id: 1,
                stateId: "star1",
                color: "black"
            },
            {
                id: 2,
                stateId: "star2",
                color: "black"
            },
            {
                id: 3,
                stateId: "star3",
                color: "black"
            },
            {
                id: 4,
                stateId: "star4",
                color: "black"
            },
            {
                id: 5,
                stateId: "star5",
                color: "black"
            }]
        }
    }


    componentWillMount() {
        let that = this;
        let dataMovie = null;
        let xhrMovieInfo = new XMLHttpRequest();
        xhrMovieInfo.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    movie: JSON.parse(this.responseText)
                });
            }
        });

        xhrMovieInfo.open("GET", this.props.baseUrl + "movies/" + this.props.match.params.id);
        xhrMovieInfo.setRequestHeader("Cache-Control", "no-cache");
        xhrMovieInfo.send(dataMovie);
    }

    onStarClick = (id) => {
        let starIconList = [];
        for (let star of this.state.starIcons) {
            let starNode = star;
            if (star.id <= id) {
                starNode.color = "yellow"
            }
            else {
                starNode.color = "black";

            }
            starIconList.push(starNode);
        }
        this.setState({ starIcons: starIconList });
    }

    onArtistClick = (url) => {
        window.location = url;
    }

    render() {
        let movie = this.state.movie;
        const opts = {
            height: '300',
            width: '700',
            playerVars: {
                autoplay: 1
            }
        }
        return(
            <div className="detailsPage">
                <Header id={this.props.match.params.id} baseUrl={this.props.baseUrl} showBookShowButton="true" />
                <div className="back-button">
                    <Typography>
                        <Link to="/">  &#60; Back to Home</Link>
                    </Typography>
                </div>
                <div className="flex-container">
                    <div className="left-details">
                        <img src={movie.poster_url} alt={movie.title} />
                    </div>
                    <div className="center-details">
                        <div>
                            <Typography variant="headline" component="h2">{movie.title} </Typography>
                        </div>
                        <br />
                        <div>
                            <Typography>
                                <span className="bold">Genres: </span> {movie.genres.join(', ')}
                            </Typography>
                        </div>
                        <div>
                            <Typography><span className="common-text-bold">Duration:</span> {movie.duration} </Typography>
                        </div>
                        <div>
                            <Typography><span className="common-text-bold">Release Date:</span> {new Date(movie.release_date).toDateString()} </Typography>
                        </div>
                        <div>
                            <Typography><span className="common-text-bold"> Rating:</span> {movie.critics_rating}  </Typography>
                        </div>
                        <div className="common-margin-top-16">
                            <Typography><span className="common-text-bold">Plot:</span> <a href={movie.wiki_url}>(Wiki Link)</a> {movie.storyline} </Typography>
                        </div>
                        <div className="trailer-container">
                            <Typography>
                                <span className="common-text-bold">Trailer:</span>
                            </Typography>
                            {console.log(movie)}
                            <YouTube
                                videoId={movie.trailer_url.split("?v=")[1]}
                                opts={opts}
                                onReady={this._onReady}
                            />
                        </div>
                    </div>
                    <div className="right-details">
                        <Typography>
                            <span className="common-text-bold">Rate this movie: </span>
                        </Typography>
                        {this.state.starIcons.map(star => (
                            <StarBorderIcon
                                className={star.color}
                                key={"star" + star.id}
                                onClick={() => this.onStarClick(star.id)}
                            />
                        ))}
                        <div className="common-text-bold common-margin-bottom-16 common-margin-top-16">
                        <Typography>
                                <span className="common-text-bold">Artists:</span>
                            </Typography>
                        </div>
                        <div className="right-padding">
                            <GridList cellHeight={160} cols={2}>
                                {movie.artists != null && movie.artists.map(artist => (
                                    <GridListTile
                                        className="artist-tile"
                                        onClick={() => this.onArtistClick(artist.wiki_url)}
                                        key={artist.id}>
                                        <img src={artist.profile_url} alt={artist.first_name + " " + artist.last_name} />
                                        <GridListTileBar
                                            title={artist.first_name + " " + artist.last_name}
                                        />
                                    </GridListTile>
                                ))}
                            </GridList>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

export default Details;