import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  Skeleton,
} from "@mui/material";

const Skeletons = () => {
  return (
    <Card
      sx={{
        width: "100%",
        minHeight: 275,
        margin: "1rem 0",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {/* HEADING */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            padding: "0.6rem 0",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            <Skeleton width="2rem" height="3rem" animation="wave" />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Skeleton width="2rem" height="3rem" animation="wave" />
          </Typography>
        </Box>

        {/* NAME */}
        <Typography variant="h5" sx={{ padding: "0.6rem 0" }}>
          <Skeleton width="8rem" height="2rem" animation="wave" />
        </Typography>

        {/* Description */}
        <Typography variant="caption">
          <Skeleton width="16rem" animation="wave" />
          <Skeleton width="16rem" animation="wave" />
          <Skeleton width="16rem" animation="wave" />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Skeletons;
