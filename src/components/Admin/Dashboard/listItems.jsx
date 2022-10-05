import React from 'react';
import clsx from 'clsx';
import { Link, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@material-ui/core';
import { Dashboard, MenuBook, People, Feedback, Assignment, Restaurant } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const SidebarItems = [
	{
		icon: 'Dashboard',
		text: 'Dashboard',
	},
	{
		icon: 'MenuBook',
		text: 'View Menu',
	},
	{
		icon: 'Restaurant',
		text: 'Add Item',
	},
	{
		icon: 'People',
		text: 'Manage People',
	},
	{
		icon: 'Feedback',
		text: 'Feedback',
	},
];



// export const mainListItems=(
//   <div>
//     {SidebarItems.map((one)=>{
//       const ComponentName=one.icon;
//       ComponentName[0].toUpperCase();

//     return (<ListItem button>
//       <ListItemIcon>
//         <ComponentName />
//       </ListItemIcon>
//       <ListItemText primary={one.text} />
//     </ListItem>)
//     })}
//   </div>
// )

const useStyles = makeStyles((theme) => ({

  linkNone:{

    "&:hover":{
      textDecoration:"none"
    }
  }
  
}));

export const MainListItems = ()=>{
  const classes = useStyles();
return(
	<div>
		<ListItem button>
			<ListItemIcon>
				<Dashboard />
			</ListItemIcon>
			<ListItemText primary="Dashboard" />
		</ListItem>
		<Link href="/viewmenu" color="inherit" className={clsx(classes.linkNone)}>
			<ListItem button>
				<ListItemIcon>
					<MenuBook />
				</ListItemIcon>
				<ListItemText primary="View/Edit Menu" />
			</ListItem>
		</Link>
		<Link href="/addItem" color="inherit" className={clsx(classes.linkNone)}>
			<ListItem button>
				<ListItemIcon>
					<Restaurant />
				</ListItemIcon>
				<ListItemText primary="Add Item" />
			</ListItem>
		</Link>
		<ListItem button>
			<ListItemIcon>
				<People />
			</ListItemIcon>
			<ListItemText primary="Manage People" />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<Feedback />
			</ListItemIcon>
			<ListItemText primary="Feedback" />
		</ListItem>
	</div>
)
};

export const secondaryListItems = (
	<div>
		<ListSubheader inset>Saved reports</ListSubheader>
		<ListItem button>
			<ListItemIcon>
				<Assignment />
			</ListItemIcon>
			<ListItemText primary="Current month" />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<Assignment />
			</ListItemIcon>
			<ListItemText primary="Last quarter" />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<Assignment />
			</ListItemIcon>
			<ListItemText primary="Year-end sale" />
		</ListItem>
	</div>
);
