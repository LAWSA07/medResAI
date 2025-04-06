import React from 'react';
import { Link } from 'react-router-dom';
import { InsertChartIcon } from '@mui/icons-material';

const Navbar: React.FC = () => {
  const navigationLinks = [
    {
      label: 'Molecule Viewer',
      path: '/molecules',
      icon: <InsertChartIcon />,
    },
  ];

  return (
    <div>
      {/* Render your navigation links here */}
    </div>
  );
};

export default Navbar;