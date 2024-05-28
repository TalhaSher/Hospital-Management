import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import DescriptionIcon from "@mui/icons-material/Description";
import { Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [value, setValue] = React.useState(location.pathname);

  React.useEffect(() => {
    setValue(location.pathname);
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        bottom: 0,
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          width: "80%",
        }}
      >
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => handleChange(event, newValue)}
          sx={{
            background: "rgba(53, 231, 255, 0.7)",
            borderRadius: "16px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(8.1px)",
            WebkitBackdropFilter: "blur(8.1px)",
            border: "1px solid rgba(255, 255, 255, 0.14)",
          }}
        >
          <BottomNavigationAction
            label="Doctors"
            value="/doctors"
            icon={<LocalHospitalIcon />}
          />
          <BottomNavigationAction
            label="Appointments"
            value="/appointments"
            icon={<EventAvailableIcon />}
          />
          <BottomNavigationAction
            label="Prescriptions"
            value="/prescriptions"
            icon={<DescriptionIcon />}
          />
        </BottomNavigation>
      </Box>
    </Box>
  );
};

export default Navigation;
