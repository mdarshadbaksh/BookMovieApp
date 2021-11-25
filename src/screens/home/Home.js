import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import { withStyles } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Card from '@material-ui/core/Card';
import InputLabel from '@material-ui/core/InputLabel';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';


const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    upcomingMoviesHeader: {
        textAlign: 'center',
        background: '#ff9999',
        padding: '8px',
        fontSize: '1rem'
    },
    listOfUpcomingMovies: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        width: '100%'
    },
    movieList: {
        transform: 'translateZ(0)',
        cursor: 'pointer'
    },
    form: {
        margin: theme.spacing.unit,
        minWidth: 240,
        maxWidth: 240
    },
    title: {
        color: theme.palette.primary.light,
    }
});
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieName: "",
            upcomingMovies: [],
            releasedMovies: [],
            genres: [],
            artists: [],
            genresList: [],
            artistsList: [],
            releaseDateStart: "",
            releaseDateEnd: ""
        }
    }
    componentWillMount(){
        // To Get the upcoming movies
        let data = null;
        let xhrUpcoming = new XMLHttpRequest();
        let that = this;
        xhrUpcoming.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    upcomingMovies: JSON.parse(this.responseText).movies
                });
            }
        });

        xhrUpcoming.open("GET", this.props.baseUrl + "movies?status=PUBLISHED");
        xhrUpcoming.setRequestHeader("Cache-Control", "no-cache");
        xhrUpcoming.send(data);

        // To get the released movies
        let dataReleasedMovies = null;
        let xhrReleasedMovies = new XMLHttpRequest();
        xhrReleasedMovies.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    releasedMovies: JSON.parse(this.responseText).movies
                });
            }
        });

        xhrReleasedMovies.open("GET", this.props.baseUrl + "movies?status=RELEASED");
        xhrReleasedMovies.setRequestHeader("Cache-Control", "no-cache");
        xhrReleasedMovies.send(dataReleasedMovies);

        // To get the genres
        let dataOfGenres = null;
        let xhrGenresData = new XMLHttpRequest();
        xhrGenresData.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    genresList: JSON.parse(this.responseText).genres
                });
            }
        });

        xhrGenresData.open("GET", this.props.baseUrl + "genres");
        xhrGenresData.setRequestHeader("Cache-Control", "no-cache");
        xhrGenresData.send(dataOfGenres);

        // Get artists
        let dataOfArtists = null;
        let xhrArtistsData = new XMLHttpRequest();
        xhrArtistsData.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    artistsList: JSON.parse(this.responseText).artists
                });
            }
        });

        xhrArtistsData.open("GET", this.props.baseUrl + "artists");
        xhrArtistsData.setRequestHeader("Cache-Control", "no-cache");
        xhrArtistsData.send(dataOfArtists);
        
    }

    onMovieClick = (movieId) => {
        this.props.history.push('/movie/' + movieId);
    }
    onMovieNameChange = (event) => {
        this.setState({ movieName: event.target.value });
    }

    onGenreSelectChange = (event) => {
        this.setState({ genres: event.target.value });
    }

    onArtistSelectChange = (event) => {
        this.setState({ artists: event.target.value });
    }

    onReleaseDateStartChange = (event) => {
        this.setState({ releaseDateStart: event.target.value });
    }

    onReleaseDateEndChange = (event) => {
        this.setState({ releaseDateEnd: event.target.value });
    }
    onFilterButtonClick = () => {
        let queryString = "?status=RELEASED";
        if (this.state.movieName !== "") {
            queryString += "&title=" + this.state.movieName;
        }
        if (this.state.genres.length > 0) {
            queryString += "&genres=" + this.state.genres.toString();
        }
        if (this.state.artists.length > 0) {
            queryString += "&artists=" + this.state.artists.toString();
        }
        if (this.state.releaseDateStart !== "") {
            queryString += "&start_date=" + this.state.releaseDateStart;
        }
        if (this.state.releaseDateEnd !== "") {
            queryString += "&end_date=" + this.state.releaseDateEnd;
        }

        let that = this; 
        let dataFilter = null;
        let xhrFilterData = new XMLHttpRequest();
        xhrFilterData.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    releasedMovies: JSON.parse(this.responseText).movies
                });
            }
        });
        xhrFilterData.open("GET", this.props.baseUrl + "movies" + encodeURI(queryString));
        xhrFilterData.setRequestHeader("Cache-Control", "no-cache");
        xhrFilterData.send(dataFilter);
    }
    render() {
        
        const { classes } = this.props;
        return(
            <div>
                <Header baseUrl={this.props.baseUrl}/>
                <div className="heading">
                    <span>Upcoming Movies</span>
                </div>
                <GridList cols={5} className={classes.listOfUpcomingMovies}>
                    {this.state.upcomingMovies.map(movie => (
                        <GridListTile key={"upcoming" + movie.id}>
                            <img src={movie.poster_url} className="movie-poster" alt={movie.title} />
                            <GridListTileBar title={movie.title} />
                        </GridListTile>
                    ))}
                </GridList>
                <div className="flex-container">
                    <div className="left">
                        <GridList cellHeight={350} cols={4} className={classes.movieList}>
                            {this.state.releasedMovies.map(movie => (
                                <GridListTile className="released-movie-grid-item" onClick={() => this.onMovieClick(movie.id)} key={"grid" + movie.id}>
                                    <img src={movie.poster_url} className="movie-poster" alt={movie.title} />
                                    <GridListTileBar
                                        title={movie.title}
                                        subtitle={<span>Release Date: {new Date(movie.release_date).toDateString()}</span>}
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
                    <div className="right">
                        <Card className = 'card'>
                            <CardContent>
                                <FormControl className={classes.form}>
                                    <Typography className={classes.title} color="textSecondary">
                                        FIND MOVIES BY:
                                    </Typography>
                                </FormControl>

                                <FormControl className={classes.form}>
                                    <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                                    <Input id="movieName" onChange={this.onMovieNameChange} />
                                </FormControl>

                                <FormControl className={classes.form}>
                                    <InputLabel htmlFor="select-multiple-checkbox">Genres</InputLabel>
                                    <Select
                                        multiple
                                        input={<Input id="select-multiple-checkbox-genre" />}
                                        renderValue={selected => selected.join(',')}
                                        value={this.state.genres}
                                        onChange={this.onGenreSelectChange}
                                    >
                                        {this.state.genresList.map(genre => (
                                            <MenuItem key={genre.id} value={genre.genre}>
                                                <Checkbox checked={this.state.genres.indexOf(genre.genre) > -1} />
                                                <ListItemText primary={genre.genre} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl className={classes.form}>
                                    <InputLabel htmlFor="select-multiple-checkbox">Artists</InputLabel>
                                    <Select
                                        multiple
                                        input={<Input id="select-multiple-checkbox" />}
                                        renderValue={selected => selected.join(',')}
                                        value={this.state.artists}
                                        onChange={this.onArtistSelectChange}
                                    >
                                        {this.state.artistsList.map(artist => (
                                            <MenuItem key={artist.id} value={artist.first_name + " " + artist.last_name}>
                                                <Checkbox checked={this.state.artists.indexOf(artist.first_name + " " + artist.last_name) > -1} />
                                                <ListItemText primary={artist.first_name + " " + artist.last_name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl className={classes.form}>
                                    <TextField
                                        id="releaseDateStart"
                                        label="Release Date Start"
                                        type="date"
                                        defaultValue=""
                                        InputLabelProps={{ shrink: true }}
                                        onChange={this.onReleaseDateStartChange}
                                    />
                                </FormControl>

                                <FormControl className={classes.form}>
                                    <TextField
                                        id="releaseDateEnd"
                                        label="Release Date End"
                                        type="date"
                                        defaultValue=""
                                        InputLabelProps={{ shrink: true }}
                                        onChange={this.onReleaseDateEndChange}
                                    />
                                </FormControl>
                                <br /><br />
                                <FormControl className={classes.form}>
                                    <Button onClick={() => this.onFilterButtonClick()} variant="contained" color="primary">
                                        APPLY
                                    </Button>
                                </FormControl>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Home);