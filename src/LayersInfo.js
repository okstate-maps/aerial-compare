/*

Each layer has the following required values:

	sortVal {numeric}: value to be used to determine the value used for sort order.
	type {string}: The Leaflet layer type. Values can be WMSTileLayer, EsriTiledMapLayer, TiledLayer, and others.
		See Leaflet documentation for others. Esri Leaflet has more also, but they need porting to leaflet-react.
	id {string}: A unique identifier used to keep React happy.
	display_name {string}: What you want to be displayed over the layer's selection tile.
	url {string}: The url to the service

*/
let ARCGIS_BASE_TILE_PATH = "https://tiles.arcgis.com/tiles/jWQlP64OuwDh6GGX/arcgis/rest/services";

module.exports = [

      {
        "sortVal": 1923,
        "type": "EsriTiledMapLayer",
        "id": "stw_1923map",
        "display_name": "1923",
        "url": ARCGIS_BASE_TILE_PATH + "/stw_1923map/MapServer",
        "thumbnail_file": "thumb_stw_1923map.JPG",
        "maxZoom": 20
      },      {
        "sortVal": 1936,
        "type": "EsriTiledMapLayer",
        "id": "oksm_WPA_PAY_017",
        "display_name": "1936",
        "url": ARCGIS_BASE_TILE_PATH + "/oksm_WPA_PAY_017/MapServer",
        "thumbnail_file": "thumb_oksm_WPA_PAY_017.JPG",
        "maxZoom": 20
      },
      {
        "sortVal": 1938,
        "type": "EsriTiledMapLayer",
        "id": "stw1938",
        "display_name": "1938",
        "url": ARCGIS_BASE_TILE_PATH + "/stw1938/MapServer",
        "thumbnail_file": "thumb_stw1938.JPG",
        "maxZoom": 19
      },

      {
        "sortVal": 1949,
        "type": "EsriTiledMapLayer",
        "id": "stw1949",
        "display_name": "1949",
        "url": ARCGIS_BASE_TILE_PATH + "/stw1949/MapServer",
        "thumbnail_file": "thumb_stw1949.JPG",
        "maxZoom": 19
      },

      {
        "sortVal": 1956,
        "type": "EsriTiledMapLayer",
        "id": "stw1956_tiles",
        "display_name": "1956",
        "url": ARCGIS_BASE_TILE_PATH + "/stw1956_tiles/MapServer",
        "thumbnail_file": "thumb_stw1956_tiles.JPG",
        "maxZoom": 19
      },
      {
        "sortVal": 1959,
        "type": "EsriTiledMapLayer",
        "id": "Map_Stillwater_1959",
        "display_name": "1959",
       "thumbnail_file": "thumb_Map_Stillwater_1959.JPG",
        "url": ARCGIS_BASE_TILE_PATH + "/Map_Stillwater_1959/MapServer"
      },
      {
        "sortVal": 1963,
        "type": "EsriTiledMapLayer",
        "id": "stw1963",
        "display_name": "1963",
        "url": ARCGIS_BASE_TILE_PATH + "/stw1963/MapServer",
        "thumbnail_file": "thumb_stw1963.JPG",
        "maxZoom": 19
      },
      {
        "sortVal": 1969,
        "type": "EsriTiledMapLayer",
        "id": "stw1969_3",
        "display_name": "1969",
        "url": ARCGIS_BASE_TILE_PATH + "/stw1969_3/MapServer",
        "thumbnail_file": "thumb_stw1969_3.JPG",
        "maxZoom": 19
      },
      {
        "sortVal": 1969,
        "type": "EsriTiledMapLayer",
        "id": "stw1969_3k",
        "display_name": "1969 (OSU)",
        "url": ARCGIS_BASE_TILE_PATH + "/stw1969_3k/MapServer",
        "thumbnail_file": "thumb_stw1969_3k.JPG",
        "maxZoom": 20
      },
      {
        "sortVal": 1978,
        "type": "EsriTiledMapLayer",
        "id": "OSU_1978",
        "display_name": "1978 (OSU)",
        "url": ARCGIS_BASE_TILE_PATH + "/OSU_1978/MapServer",
        "thumbnail_file": "thumb_OSU_1978.JPG",
        "maxZoom": 20
      },
      {
        "sortVal": 1978,
        "type": "EsriTiledMapLayer",
        "id": "stw1979",
        "display_name": "1979",
        "url": ARCGIS_BASE_TILE_PATH + "/stw1979/MapServer",
        "thumbnail_file": "thumb_stw1979.JPG",
        "maxZoom": 19
      },
      {
        "sortVal": 1986,
        "type": "EsriTiledMapLayer",
        "id": "osu1986_2",
        "display_name": "1986 (OSU)",
        "url": ARCGIS_BASE_TILE_PATH + "/osu1986_2/MapServer",
        "thumbnail_file": "thumb_osu1986_2.JPG",
        "maxZoom": 20
      },

      {
        "sortVal": 1995,
        "type": "EsriTiledMapLayer",
        "id": "stw1995_2",
        "display_name": "1995",
        "url": ARCGIS_BASE_TILE_PATH + "/stw1995_2/MapServer",
        "thumbnail_file": "thumb_stw1995_2.JPG",
        "maxZoom": 18
      },
      {
        "sortVal": 1996,
        "type": "EsriTiledMapLayer",
        "id": "osu1996",
        "display_name": "1996 (OSU)",
        "url": ARCGIS_BASE_TILE_PATH + "/osu1996/MapServer",
        "thumbnail_file": "thumb_osu1996.JPG",
        "maxZoom": 20
      },
      {
        "sortVal": 1999,
        "type": "EsriTiledMapLayer",
        "id": "stw1999_2",
        "display_name": "1999",
        "url": ARCGIS_BASE_TILE_PATH + "/stw1999_2/MapServer",
        "thumbnail_file": "thumb_stw1999_2.JPG",
        "maxZoom": 20
      },      
      {
        "sortVal": 2003,
        "type": "EsriTiledMapLayer",
        "id": "payne_2003",
        "display_name": "2003",
        "url": ARCGIS_BASE_TILE_PATH + "/payne_2003/MapServer",
        "thumbnail_file": "thumb_payne_2003.JPG",
        "maxZoom": 19
      },
      {
        "sortVal": 2006,
        "type": "EsriTiledMapLayer",
        "id": "Payne_2006_sid",
        "display_name": "2006",
        "url": ARCGIS_BASE_TILE_PATH + "/Payne_2006_sid/MapServer",
        "thumbnail_file": "thumb_Payne_2006_sid.JPG",
        "maxZoom": 19
      },
      {
        "sortVal": 2010,
        "type": "EsriTiledMapLayer",
        "id": "payne_2010",
        "display_name": "2010",
        "url": ARCGIS_BASE_TILE_PATH + "/payne_2010/MapServer",
        "thumbnail_file": "thumb_payne_2010.JPG",
        "maxZoom": 19
      },

      {
        "sortVal": 9999,    
        "type": "EsriTiledMapLayer", 
        "id": "esri_imagery",
        "display_name": "Today",
        "thumbnail_file": "thumb_naip2017.JPG",
        "url": "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
        "maxZoom": 19
      }
      // {
      //   "sortVal": 2017,    
      //   "type": "WMSTileLayer", 
      //   "id": "naip2017",
      //   "layers": "0",
      //   "display_name": "2017",
      //   "thumbnail_file": "thumb_naip2017.JPG",
      //   "url": "https://gis.apfo.usda.gov/arcgis/services/NAIP/Oklahoma/ImageServer/WMSServer"
      // }
  
      //{
      //   "type": "TileLayer",
      //   "id": "osuOrange",
      //   "display_name": "orange",
      //  "thumbnail_file": "thumb_osuOrange.JPG",
      //   "url": "https://api.mapbox.com/styles/v1/krdyke/cj9slcunc24xi2sqpg7xnsigk/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3JkeWtlIiwiYSI6Ik15RGcwZGMifQ.IR_NpAqXL1ro8mFeTIdifg"
      // },

];