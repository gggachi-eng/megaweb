import React from 'react';
import { Drawer, List, ListItem, ListItemText, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export default function PjtSidebar({ menus }) {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        {menus.map((menu, idx) => (
          <ListItem button key={idx} onClick={() => navigate(`/${menu.path}`)}>
            <ListItemText primary={menu.name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

// export default function PjtSidebar({ menus }) {
//   const navigate = useNavigate();

//   return (
//     <List component="nav" sx={{ width: 250, bgcolor: 'background.paper' }}>
//       {menus.map((menu, index) => (
//         <ListItemButton key={index} onClick={() => navigate(menu.path)}>
//           <ListItemText primary={menu.name} />
//         </ListItemButton>
//       ))}
//     </List>
//   );
// }
