const express = require('express');
const turf = require('@turf/turf');
const router = express.Router();
const rivers = require('../json/rios-df-141223.json');

router.get('/getAllRivers', (req, res) => {

  const lines = rivers.features.slice(0, 80).map(river => {
    return river;
  })
  res.send(lines)
});

router.get('/getPointCircle', (req, res) => {

  var center = [-47.89642922232735, -15.682590950535907];
  var xSemiAxis = 1;
  var ySemiAxis = 1;
  var ellipse = turf.ellipse(center, xSemiAxis, ySemiAxis);

  res.send(ellipse)
});

router.get('/getFilteredRivers', (req, res) => {

  const point = turf.point([-47.89642922232735, -15.682590950535907]);

  const lines = rivers.features.slice(0, 80).map(river => {
    //return turf.lineString(river.geometry.coordinates)
    //return { properties: river.properties, coordinates: turf.lineString(river.geometry.coordinates) }
    return { ...river, lineString: turf.lineString(river.geometry.coordinates) }
  })

  const nearestPoints = lines.map(line => {
    return {
      ...line,
      nearestPointOnLine: turf.nearestPointOnLine(line.lineString, point)
    }
  });

  nearestPoints.sort((a, b) => a.nearestPointOnLine.properties.dist - b.nearestPointOnLine.properties.dist);

  const closestLines = nearestPoints.slice(0, 10).map(result => result);

  res.send(closestLines);

});




module.exports = router;
