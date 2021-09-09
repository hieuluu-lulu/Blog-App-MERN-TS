/** @format */

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import { useAppSelector } from '../../hooks/hookState';

export const Header = () => {
	const classes = useStyles();
	const user = useAppSelector((state) => state.auth);
	console.log(user);
	return (
		<AppBar className={classes.appBar} position='static'>
			<Toolbar>
				<IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='open drawer'>
					<MenuIcon />
				</IconButton>
				<Typography className={classes.title} variant='h6' noWrap component={Link} to='/'>
					Blog Dev
				</Typography>
				<div className={classes.search}>
					<div className={classes.searchIcon}>
						<SearchIcon />
					</div>
					<InputBase
						placeholder='Search…'
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput,
						}}
						inputProps={{ 'aria-label': 'search' }}
					/>
				</div>
				<Button component={Link} to='/login' color='inherit' className={classes.loginBtn}>
					Login
				</Button>
			</Toolbar>
		</AppBar>
	);
};
