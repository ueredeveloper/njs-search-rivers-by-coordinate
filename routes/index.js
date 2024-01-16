const express = require('express');
const turf = require('@turf/turf');
const router = express.Router();
const rivers = require('../json/rios-df-141223.json');

router.get('/getAllRivers', (req, res) => {

  const lines = rivers.features.slice(0, 40).map(river => {
    return turf.lineString(river.geometry.coordinates)
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

  const lines = rivers.features.slice(0, 40).map(river => {
    return turf.lineString(river.geometry.coordinates)
  })

  const nearestPoints = lines.map(line => {
    return { ...line, properties: turf.nearestPointOnLine(line, point) }
  });

  nearestPoints.sort((a, b) => a.properties.properties.dist - b.properties.properties.dist);

  const closestLines = nearestPoints.slice(0, 5).map(result => result);

  res.send(closestLines);

});




module.exports = router;
