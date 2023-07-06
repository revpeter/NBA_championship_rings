(async () => {

    // Load the dataset
    const data = await fetch(
        "./data/ringMinDf.json"
    ).then(response => response.json());

    var uniqueGroupsScatter = [];

    data.forEach(function(point) {
      if (uniqueGroupsScatter.indexOf(point.rings) === -1) {
        uniqueGroupsScatter.push(point.rings);
      }
    });

    var seriesDataScatter = [];
    uniqueGroupsScatter.forEach(function(group) {
      var groupDataScatter = data.filter(function(point) {
        return point.ring === group;
      });
  
      var seriesScatter = {
        name: group,
        label: group,
        data: groupDataScatter.map(function(point) {
          return {x:point.AGE, y:point.SEASON, playerName:point.PLAYER, playerRing:point.ring, teamName:point.team_name};
        })
      };
  
      seriesDataScatter.push(point);
    });


    console.log(uniqueGroupsScatter);

})();