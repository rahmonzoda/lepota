angular.module('lepota.fabric.constants', [])

.service('FabricConstants', [function() {

	var objectDefaults = {
		rotatingPointOffset: 20,
		padding: 0,
		borderColor: 'EEF6FC',
		cornerColor: 'rgba(64, 159, 221, 1)',
		cornerSize: 10,
		transparentCorners: false,
		hasRotatingPoint: true,
		centerTransform: true
	};

	return {
		product: {
	        id: 152,
	        images: [
	            {
	                "id": "394",
	                "url": "img/demo1.jpg",
	                "width": 500,
	                "height": 500,
	                "pa_left": "30",
	                "pa_top": "20",
	                "pa_width": "41",
	                "pa_height": "66",
	                "pa_stroke": "#555",
	                "is_general_image": true,
	                "mask_type": "0",
	                "mask": "",
	                "mask_width_orig": 375,
	                "single_image_width": 500,
	                "single_image_height": 500,
	                "shop_thumbnail_width": 120,
	                "shop_thumbnail_height": 120
	            },
	            {
	                "id": "393",
	                "url": "img/demo2.jpg",
	                "width": 500,
	                "height": 500,
	                "pa_left": "29",
	                "pa_top": "15",
	                "pa_width": "46",
	                "pa_height": "75",
	                "pa_stroke": "#555",
	                "is_general_image": false,
	                "mask_type": "0",
	                "mask": "",
	                "mask_width_orig": 375,
	                "single_image_width": 500,
	                "single_image_height": 500,
	                "shop_thumbnail_width": 120,
	                "shop_thumbnail_height": 120
	            }
	        ]
	    },

		clipArts: {			
	        categories: {
	            "15": {
	                "id": "15",
	                "name": "Действие",
	                "children": []
	            },
	            "7": {
	                "id": "7",
	                "name": "Животные",
	                "children": [
	                    {
	                        "id": "10",
	                        "name": "Кошки"
	                    },
	                    {
	                        "id": "8",
	                        "name": "Собаки"
	                    },
	                    {
	                        "id": "11",
	                        "name": "Лошади"
	                    },
	                    {
	                        "id": "13",
	                        "name": "Кенгуру"
	                    }
	                ]
	            },
	            "9": {
	                "id": "9",
	                "name": "Смешной",
	                "children": []
	            },
	            "12": {
	                "id": "12",
	                "name": "Фигуры",
	                "children": []
	            },
	            "14": {
	                "id": "14",
	                "name": "Знаки",
	                "children": [
						{
	                        "id": "16",
	                        "name": "Логотипы"
	                    }
					]
	            }
	        },
	        arts: [
	            {
	                "id": 376,
					"clipart": true,
	                "url": "arts/noun-project-122-1.svg",
	                "categories": [
	                    14
	                ]
	            },
	            {
	                "id": 362,
					"clipart": false,
	                "url": "arts/johnny-automatic-big-earred-dog.svg",
	                "categories": [
	                    7,
	                    9
	                ]
	            },
	            {
	                "id": 363,
					"clipart": false,
	                "url": "arts/Gerald-G-Clam-Security-Guard.svg",
	                "categories": [
	                    7,
	                    9
	                ]
	            },
	            {
	                "id": 360,
					"clipart": false,
	                "url": "arts/Machovka-teddy-bear.svg",
	                "categories": [
	                    7,
	                    9
	                ]
	            },
	            {
	                "id": 344,
					"clipart": false,
	                "url": "arts/Gerald-G-Cartoon-Cat-Walking.svg",
	                "categories": [
	                    7,
	                    10,
	                    9
	                ]
	            },
	            {
	                "id": 342,
					"clipart": false,
	                "url": "arts/Gerald-G-Dog-Face-Cartoon-World-Label.svg",
	                "categories": [
	                    7,
	                    8,
	                    9
	                ]
	            },
	            {
	                "id": 341,
					"clipart": true,
	                "url": "arts/liftarn-Ddraig.svg",
	                "categories": [
	                    7,
	                    14
	                ]
	            },
	            {
	                "id": 339,
					"clipart": true,
	                "url": "arts/liftarn-Bat.svg",
	                "categories": [
	                    7
	                ]
	            },
	            {
	                "id": 338,
					"clipart": true,
	                "url": "arts/johnny-automatic-Lion.svg",
	                "categories": [
	                    7,
	                    10
	                ]
	            },
	            {
	                "id": 335,
					"clipart": false,
	                "url": "arts/Gerald-G-Gorilla-with-Colour.svg",
	                "categories": [
	                    7,
	                    9
	                ]
	            },
	            {
	                "id": 336,
					"clipart": false,
	                "url": "arts/johnny-automatic-cartoon-dog.svg",
	                "categories": [
	                    7,
	                    9
	                ]
	            },
	            {
	                "id": 319,
					"clipart": false,
	                "url": "arts/johnny-automatic-animal-parade-2.svg",
	                "categories": [
	                    7,
	                    9
	                ]
	            },
	            {
	                "id": 320,
					"clipart": true,
	                "url": "arts/johnny-automatic-boar-hunt.svg",
	                "categories": [
	                    15
	                ]
	            },
	            {
	                "id": 322,
					"clipart": true,
	                "url": "arts/johnny-automatic-moose.svg",
	                "categories": [
	                    7
	                ]
	            },
	            {
	                "id": 321,
					"clipart": true,
	                "url": "arts/johnny-automatic-hunting-boar.svg",
	                "categories": [
	                    15
	                ]
	            },
	            {
	                "id": 323,
					"clipart": true,
	                "url": "arts/johnny-automatic-on-the-horse.svg",
	                "categories": [
	                    15
	                ]
	            },
	            {
	                "id": 324,
					"clipart": false,
	                "url": "arts/papapishu-Fighting-cat.svg",
	                "categories": [
	                    7,
	                    10,
	                    9
	                ]
	            },
	            {
	                "id": 316,
					"clipart": true,
	                "url": "arts/johnny-automatic-pig-sticking.svg",
	                "categories": [
	                    15
	                ]
	            },
	            {
	                "id": 298,
					"clipart": false,
	                "url": "arts/opasno_yadovitye_veshestva_Abali.ru_.png",
	                "categories": [
	                    14
	                ]
	            },
	            {
	                "id": 299,
					"clipart": false,
	                "url": "arts/znak-radiaciya.png",
	                "categories": [
	                    14
	                ]
	            },
	            {
	                "id": 300,
					"clipart": false,
	                "url": "arts/biologicheskaya_opasnost_infekcionnie_veshestva_Abali.ru_.png",
	                "categories": [
	                    14
	                ]
	            },
	            {
	                "id": 301,
					"clipart": false,
	                "url": "arts/ezhevika.png",
	                "categories": [
	                    9
	                ]
	            },
	            {
	                "id": 302,
					"clipart": false,
	                "url": "arts/opasno_lazernoe_izluchenie_Abali.ru_.png",
	                "categories": [
	                    14
	                ]
	            },
	            {
	                "id": 287,
					"clipart": false,
	                "url": "arts/flower-smiley-remix1.png",
	                "categories": [
	                    9
	                ]
	            },
	            {
	                "id": 265,
					"clipart": false,
	                "url": "arts/liftarn_Cat_silhouette.svg",
	                "categories": [
	                    7,
	                    10
	                ]
	            },
	            {
	                "id": 263,
					"clipart": false,
	                "url": "arts/johnny_automatic_cartoon_dog_1.svg",
	                "categories": [
	                    7,
	                    8,
	                    9
	                ]
	            },
	            {
	                "id": 262,
					"clipart": true,
	                "url": "arts/johnny_automatic_black_cat.svg",
	                "categories": [
	                    7,
	                    10
	                ]
	            },
	            {
	                "id": 261,
					"clipart": true,
	                "url": "arts/johnny_automatic_barking_dog.svg",
	                "categories": [
	                    7,
	                    8
	                ]
	            },
	            {
	                "id": 260,
					"clipart": false,
	                "url": "arts/Horse-Silhouette1.svg",
	                "categories": [
	                    7,
	                    11
	                ]
	            },
	            {
	                "id": 259,
					"clipart": false,
	                "url": "arts/horse1.svg",
	                "categories": [
	                    7,
	                    11
	                ]
	            },
	            {
	                "id": 255,
					"clipart": false,
	                "url": "arts/dog.svg",
	                "categories": [
	                    7,
	                    8
	                ]
	            },
	            {
	                "id": 244,
					"clipart": false,
	                "url": "arts/johnny_automatic_horse_skeleton.svg",
	                "categories": [
	                    7,
	                    9,
	                    11
	                ]
	            },
	            {
	                "id": 243,
					"clipart": false,
	                "url": "arts/Horse-Silhouette.svg",
	                "categories": [
	                    7,
	                    11
	                ]
	            },
	            {
	                "id": 242,
					"clipart": false,
	                "url": "arts/horse.svg",
	                "categories": [
	                    7,
	                    11
	                ]
	            },
	            {
	                "id": 232,
					"clipart": false,
	                "url": "arts/ryanlerch_No_horse_riding_sign.svg",
	                "categories": [
	                    14
	                ]
	            },
	            {
	                "id": 218,
					"clipart": true,
	                "url": "arts/nicubunu_Kangaroo_contour.svg",
	                "categories": [
	                    7,
	                    13
	                ]
	            },
	            {
	                "id": 200,
					"clipart": false,
	                "url": "arts/knot_3.svg",
	                "categories": [
	                    12
	                ]
	            },
	            {
	                "id": 199,
					"clipart": false,
	                "url": "arts/knot_2.svg",
	                "categories": [
	                    12
	                ]
	            },
	            {
	                "id": 197,
					"clipart": false,
	                "url": "arts/Dodecahedron.svg",
	                "categories": [
	                    12
	                ]
	            },
	            {
	                "id": 180,
					"clipart": false,
	                "url": "arts/octahedron.svg",
	                "categories": [
	                    12
	                ]
	            },
	            {
	                "id": 162,
					"clipart": false,
	                "url": "arts/dog_silhouette.svg",
	                "categories": [
	                    7,
	                    8
	                ]
	            },
	            {
	                "id": 161,
					"clipart": true,
	                "url": "arts/CAT.svg",
	                "categories": [
	                    7,
	                    10,
	                    9
	                ]
	            },
	            {
	                "id": 159,
					"clipart": false,
	                "url": "arts/cat-farbe.svg",
	                "categories": [
	                    7,
	                    10,
	                    9
	                ]
	            },
	            {
	                "id": 163,
					"clipart": false,
	                "url": "arts/dog-contactr.svg",
	                "categories": [
	                    7,
	                    8,
	                    9
	                ]
	            },
	            {
	                "id": 163,
					"clipart": false,
	                "url": "arts/AngularJS_logo.svg",
	                "categories": [
	                    14
	                ]
	            }
	        ]
	    },
		fonts: [
	        "Anaheim",
	        "Tangerine",
	        "Bevan",
	        "Iceberg",
	        "Kenia",
	        "Sunshiney",
	        "Courgette",
			'Droid Sans', 
			'Droid Serif'
	    ],

		JSONExportProperties: [
			'height',
			'width',
			'background',
			'objects',

			'originalHeight',
			'originalWidth',
			'originalScaleX',
			'originalScaleY',
			'originalLeft',
			'originalTop',

			'lineHeight',
			'lockMovementX',
			'lockMovementY',
			'lockScalingX',
			'lockScalingY',
			'lockUniScaling',
			'lockRotation',
			'lockObject',
			'id',
			'isTinted',
			'filters'
		],

		shapeDefaults: angular.extend({
			fill: '#555'
		}, objectDefaults),

		textDefaults: angular.extend({
			originX: 'left',
			scaleX: 1,
			scaleY: 1,
			fontFamily: 'Helvetica',
			fontSize: 24,
			fill: '#454545',
			textAlign: 'left'
		}, objectDefaults)

	};

}]);
