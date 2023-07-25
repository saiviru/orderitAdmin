import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MiniDrawer from "../Sidebar/Sidebar";
import { connect, useDispatch, useSelector } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
        width: '100%',
    },
    container: {
        // paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
        marginTop: '-50px'
    },
    avatarContainer: {
        position: "relative",
        display: "inline-block",
        marginBottom: theme.spacing(2),
    },
    avatar: {
        width: theme.spacing(12),
        height: theme.spacing(12),
        margin: "0 auto",
    },
    editIcon: {
        position: "absolute",
        bottom: 10,
        // right: 0,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        borderRadius: "50%",
        cursor: "pointer",
        padding: theme.spacing(1),
    },
    fileInput: {
        display: "none",
    },
}));

const Profile = () => {
    const classes = useStyles();
    const user = useSelector((state) => state.user.user);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = () => {
        const fileInput = document.getElementById("profile-image-input");
        fileInput.click();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={classes.root}>
            <MiniDrawer headerTitle="Profile" />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} sm={4}>
                            <Paper elevation={3} className={classes.paper}>
                                <div className={classes.avatarContainer}>
                                    <Avatar
                                        alt="User Avatar"
                                        src={selectedImage || "/path/to/default-avatar.jpg"}
                                        className={classes.avatar}
                                    />
                                    <label htmlFor="profile-image-input">
                                        <EditIcon className={classes.editIcon} />
                                        <input
                                            id="profile-image-input"
                                            type="file"
                                            accept="image/*"
                                            className={classes.fileInput}
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                </div>
                                <Typography variant="h6" align="center">
                                    {user.username.split(' ').map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(' ')}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    );
};

export default Profile;
