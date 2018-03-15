/*

Each layer has the following required values:

sortVal {numeric}: value to be used to determine sort order
type {string}: The Leaflet layer type. Values can be WMSTileLayer, EsriTiledMapLayer, TiledLayer, and others.
	See Leaflet documentation for others. Esri Leaflet has more also, but they need porting to leaflet-react.
id {string}: A unique identifier used to keep React happy.
display_name {string}: What you want to be displayed over the layer's selection tile.

*/

module.exports = [
      {
        "sortVal": 0,    
        "type": "WMSTileLayer", 
        "id": "naip2017",
        "layers": "0",
        "display_name": "2017",
        "url": "https://gis.apfo.usda.gov/arcgis/services/NAIP/Oklahoma/ImageServer/WMSServer"
      },

      {
        "sortVal": 1938,
        "type": "EsriTiledMapLayer",
        "id": "stw1938",
        "display_name": "1938",
        "url": "https://tiles.arcgis.com/tiles/jWQlP64OuwDh6GGX/arcgis/rest/services/stw1938/MapServer"
      },

      {
        "sortVal": 1949,
        "type": "EsriTiledMapLayer",
        "id": "stw1949",
        "display_name": "1949",
        "url": "https://tiles.arcgis.com/tiles/jWQlP64OuwDh6GGX/arcgis/rest/services/stw1949/MapServer"
      },

      {
        "sortVal": 1956,
        "type": "EsriTiledMapLayer",
        "id": "stw1956_tiles",
        "display_name": "1956",
        "url": "https://tiles.arcgis.com/tiles/jWQlP64OuwDh6GGX/arcgis/rest/services/stw1956_tiles/MapServer"
      },
      {
        "sortVal": 1963,
        "type": "EsriTiledMapLayer",
        "id": "stw1963",
        "display_name": "1963",
        "url": "https://tiles.arcgis.com/tiles/jWQlP64OuwDh6GGX/arcgis/rest/services/stw1963/MapServer"
      },
      {
        "sortVal": 1969,
        "type": "EsriTiledMapLayer",
        "id": "stw1969_3",
        "display_name": "1969",
        "url": "https://tiles.arcgis.com/tiles/jWQlP64OuwDh6GGX/arcgis/rest/services/stw1969_3/MapServer"
      },
      {
        "sortVal": 1969,
        "type": "EsriTiledMapLayer",
        "id": "stw1969_3k_2",
        "display_name": "1969 (OSU)",
        "url": "https://tiles.arcgis.com/tiles/jWQlP64OuwDh6GGX/arcgis/rest/services/stw1969_3k_2/MapServer"
      },
      {
        "sortVal": 1978,
        "type": "EsriTiledMapLayer",
        "id": "OSU_1978",
        "display_name": "1978 (OSU)",
        "url": "https://tiles.arcgis.com/tiles/jWQlP64OuwDh6GGX/arcgis/rest/services/OSU_1978/MapServer"
      },
      {
        "sortVal": 1978,
        "type": "EsriTiledMapLayer",
        "id": "stw1979",
        "display_name": "1979",
        "url": "https://tiles.arcgis.com/tiles/jWQlP64OuwDh6GGX/arcgis/rest/services/stw1979/MapServer"
      },
      {
        "sortVal": 1986,
        "type": "EsriTiledMapLayer",
        "id": "osu1986_2",
        "display_name": "1986 (OSU)",
        "url": "https://tiles.arcgis.com/tiles/jWQlP64OuwDh6GGX/arcgis/rest/services/osu1986_2/MapServer"
      },
      {
        "sortVal": 1996,
        "type": "EsriTiledMapLayer",
        "id": "osu1996",
        "display_name": "1996 (OSU)",
        "url": "https://tiles.arcgis.com/tiles/jWQlP64OuwDh6GGX/arcgis/rest/services/osu1996/MapServer"
      }
      // {
      //   "type": "EsriTiledMapLayer",
      //   "id": "Map_Stillwater_1959",
      //   "display_name": "1959",
      //   "url": "https://tiles.arcgis.com/tiles/jWQlP64OuwDh6GGX/arcgis/rest/services/Map_Stillwater_1959/MapServer"
      // },
      //{
      //   "type": "TileLayer",
      //   "id": "osuOrange",
      //   "display_name": "orange",
      //   "url": "https://api.mapbox.com/styles/v1/krdyke/cj9slcunc24xi2sqpg7xnsigk/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3JkeWtlIiwiYSI6Ik15RGcwZGMifQ.IR_NpAqXL1ro8mFeTIdifg"
      // },

];