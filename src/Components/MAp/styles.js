const sxStyle = () => ({
  paper: {
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100px",
  },
  mapContainer: {
    mt:'1rem',
    height: "84vh",
    width: "100%",
  },
  markerContainer: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
    "&:hover": {
      zIndex: 2,
    },
  },
  pointer: {
    cursor: "pointer",
  },
});

export default sxStyle;
