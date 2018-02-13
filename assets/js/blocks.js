( function() {

	var blocks = wp.blocks;
	var el     = wp.element.createElement;
	var source = blocks.source;

	var create_element      = wp.element.createElement;
	var register_block_type = wp.blocks.registerBlockType;
	var editable            = wp.blocks.Editable;
	var inspector           = wp.blocks.InspectorControls;
	var controls            = wp.blocks.BlockControls;
	var block_description   = wp.blocks.blockDescription;
	var children            = wp.blocks.source.children;
	var alignment_toolbar   = wp.blocks.AlignmentToolbar;

	blocks.registerBlockType( 'geodir/example-01', {

		title    : 'Example 01',
		icon     : 'admin-generic',
		category : 'common',

		attributes : {
			content : {
				type   : 'array',
				source : children( 'p' )
			}
		},

		edit : function( props ) {

			var content = props.attributes.content;

			var focus = props.focus;

			function onChangeContent( newContent ) {

				props.setAttributes( { content : newContent } );
			}

			return el( blocks.Editable, {
				tagName   : 'p',
				className : props.className,
				onChange  : onChangeContent,
				value     : content,
				focus     : focus,
				onFocus   : props.setFocus
			} );
		},

		save : function( props ) {

			var content = props.attributes.content;

			return create_element( 'p', { className : props.className }, content );
		}
	} );


	blocks.registerBlockType( 'geodir/example-02', {

		title    : '02 - Logged In',
		description : 'This block is only viewable to logged-in users.',
		icon     : 'admin-generic',
		category : 'common',

		attributes : {
			content : {
				type   : 'array',
				source : children( 'p' )
			},
			dropCap: {
				type: 'boolean',
				default: false,
			},
			url : {
				type : 'string',
				default : ''
			},
			checkbox : {
				type     : 'boolean',
				default : false
			},
			radio : {
				type : 'string',
				default : ''
			},
			select : {
				type     : 'string',
				default : ''
			}

		},

		edit : function( props ) {

			var attr = props.attributes;

			var content = props.attributes.content;
			var dropCap = props.attributes.dropCap;
			var url = props.attributes.url;

			var focus = props.focus;

			var alignment = props.attributes.alignment;

			function onChangeContent( newContent ) {

				props.setAttributes( { content : newContent } );
			}

			function onChangeAlignment( newAlignment ) {
				props.setAttributes( { alignment: newAlignment } );
			}

			function toggleDropCap( newdropCap ) {
				props.setAttributes( { dropCap : ! dropCap } );
			}

			function onChangeURL( newURL ) {
				props.setAttributes( { url : newURL } );
			}

			function onChangeCheckbox( value ) {
				props.setAttributes( { checkbox : ! attr.checkbox } );
			}

			function onChangeRadio( value ) {
				props.setAttributes( { radio : value } );
			}

			function onChangeSelect( value ) {
				props.setAttributes( { select : value } );
			}

			return [
				!! focus && el( blocks.BlockControls, { key : 'controls' },

					el(
						blocks.AlignmentToolbar,
						{
							value    : alignment,
							onChange : onChangeAlignment
						}
					)
				),

				!! focus && el( blocks.InspectorControls, { key : 'inspector' },

					el(
						blocks.BlockDescription,
						{},
						el( 'p', {}, 'Testing a block description.' )
					),
					el(
						'h3',
						{},
						'Test Inspector Controls'
					),
					el(
						blocks.InspectorControls.ToggleControl,
						{
							label : 'Test Toggle',
							checked : dropCap,
							onChange : toggleDropCap
						}
					),
					el(
						blocks.InspectorControls.TextControl,
						{
							label : 'Test URL',
							value : url,
							onChange : onChangeURL
						}
					),
					el(
						blocks.InspectorControls.CheckboxControl,
						{
							label    : 'Test Checkbox',
							checked  : attr.checkbox,
							onChange : onChangeCheckbox
						}
					),
					el(
						blocks.InspectorControls.RadioControl,
						{
							label    : 'Test Radio',
							selected : attr.radio,
							onChange : onChangeRadio,
							options  : [
								{ value : 'apple',  label : 'Apple'  },
								{ value : 'banana', label : 'Banana' },
								{ value : 'orange', label : 'Orange' }
							]
						}
					),
					el(
						blocks.InspectorControls.SelectControl,
						{
							label    : 'Test Select',
							selected : attr.select,
							onChange : onChangeSelect,
							options  : [
								{ value : 'cherry',     label : 'Cherry'     },
								{ value : 'kiwi',       label : 'Kiwi'       },
								{ value : 'watermelon', label : 'Watermelon' }
							]
						}
					)
				),

				create_element( editable, {
					key       : 'editable',
					tagName   : 'p',
					className : props.className,
					onChange  : onChangeContent,
					value     : '<hr />',//content,
					focus     : focus,
					onFocus   : props.setFocus
				} )
			];
		},

		save : function( props ) {

			var content = props.attributes.content;

			return create_element( 'p', { className : props.className }, content );
		}
	} );


	/**
	 * Home page map.
	 */
	blocks.registerBlockType( 'geodir/home-map', {

		title    : 'GD Home Map', // hopefully we will be able to add our own category section soon so wont have to prefex
		description : 'Shows the home map widget',
		icon     : 'location-alt',
		category : 'common', // hopefully we will be able to add our own section here soon : https://github.com/WordPress/gutenberg/pull/1732
		keywords : ['geo','geodirectory','geodir'], // keywords for block search

		attributes : {
			content : {
				type   : 'array',
				source : children( 'p' )
			},
			width : {
				type     : 'string',
				default : '100%'
			},
			height : {
				type     : 'string',
				default : '425px'
			},
			maptype : {
				type     : 'string',
				default : ''
			},
			zoom : {
				type     : 'string',
				default : '0'
			},
			child_collapse : {
				type     : 'boolean',
				default : false
			}
		},

		edit : function( props ) {

			var attr = props.attributes;

			var content = props.attributes.content;

			var focus = props.focus;

			var alignment = props.attributes.alignment;

			function onChangeContent( newContent ) {

				props.setAttributes( { content : newContent } );
			}

			function onChangeWidth( newWidth ) {
				props.setAttributes( { width : newWidth } );
			}

			function onChangeHeight( newHeight ) {
				props.setAttributes( { height : newHeight } );
			}

			function onChangeMaptype( newMaptype ) {
				props.setAttributes( { maptype : newMaptype } );
			}

			function onChangeZoom( newZoom ) {
				props.setAttributes( { zoom : newZoom } );
			}

			function toggleChildCollapse( newValue ) {
				props.setAttributes( { child_collapse :  newValue } ); // this does not save right becasue of a bug, shoudl be fixed in next ver https://github.com/WordPress/gutenberg/pull/4720
			}





			function onChangeAlignment( newAlignment ) {
				props.setAttributes( { alignment: newAlignment } );
			}


			// return el( 'img', {
			// 	src: 'http://localhost/wp-content/uploads/2018/01/a15-11.jpg',
			// 	alt: 'xxx'
			// } );

			return [
				// !! focus && el( blocks.BlockControls, { key : 'controls' },
                //
				// 	el(
				// 		blocks.AlignmentToolbar,
				// 		{
				// 			value    : alignment,
				// 			onChange : onChangeAlignment
				// 		}
				// 	)
				// ),

				!! focus && el( blocks.InspectorControls, { key : 'inspector' },

					el(
						'h3',
						{},
						'Home Map Settings'
					),
					el(
						blocks.InspectorControls.TextControl,
						{
							label : 'Height',
							value : attr.height,
							onChange : onChangeHeight,
							help: 'px, % or vh (Default: 425px)'
						}
					),
					el(
						blocks.InspectorControls.TextControl,
						{
							label : 'Width',
							value : attr.width,
							onChange : onChangeWidth,
							help: 'px or % (Default: 100%)'
						}
					),
					el(
						blocks.InspectorControls.SelectControl,
						{
							label    : 'Map View',
							value : attr.maptype,
							onChange : onChangeMaptype,
							options  : [
								{ value : 'ROADMAP',     label : 'Road Map'     },
								{ value : 'SATELLITE',       label : 'Satellite Map'       },
								{ value : 'HYBRID', label : 'Hybrid Map' },
								{ value : 'TERRAIN', label : 'Terrain Map' }
							]
						}
					),
					el(
						blocks.InspectorControls.SelectControl,
						{
							label    : 'Map Zoom Level',
							value : attr.zoom,
							onChange : onChangeZoom,
							options  : [
								{ value : '0',label : 'Auto'}, // we will use '0' as auot
								{ value : 1, label : 1 },
								{ value : 2, label : 2 },
								{ value : 3, label : 3 },
								{ value : 4, label : 4 },
								{ value : 5, label : 5 },
								{ value : 6, label : 6 },
								{ value : 7, label : 7 },
								{ value : 8, label : 8 },
								{ value : 9, label : 9 },
								{ value : 10, label : 10 },
								{ value : 11, label : 11 },
								{ value : 12, label : 12 },
								{ value : 13, label : 13 },
								{ value : 14, label : 14 },
								{ value : 15, label : 15 },
								{ value : 16, label : 16 },
								{ value : 17, label : 17 },
								{ value : 18, label : 18 },
								{ value : 19, label : 19 }
							]
						}
					),
					el(
						blocks.InspectorControls.ToggleControl,
						{
							label : 'Collapse Sub Categories',
							checked : attr.child_collapse,
							onChange : toggleChildCollapse
						}
					)

				),

				el( 'img', {
					//src: 'http://localhost/wp-content/uploads/2018/01/a15-11.jpg',
					src: 'http://localhost/wp-content/plugins/geodirectory-v2/assets/images/block-placeholder-map.png', // @todo we need to reference this locally
					alt: 'xxx'
				} )

				// create_element( editable, {
				// 	key       : 'editable',
				// 	tagName   : 'p',
				// 	className : props.className,
				// 	onChange  : onChangeContent,
				// 	value     : content,
				// 	focus     : focus,
				// 	onFocus   : props.setFocus
				// } )
			];
		},

		save : function( props ) {

			var attr = props.attributes;
			var content = "[gd_homepage_map";
			if(attr.height){content += " height='"+attr.height+"'";}
			if(attr.width){content += " width="+attr.width;}
			if(attr.maptype){content += " maptype="+attr.maptype;}
			if(attr.zoom){content += " zoom="+attr.zoom;}
			content += "]";


			console.log(content );
			//return content;
			//return create_element( wp.element.RawHTML, null, content );
			return create_element( 'div', { dangerouslySetInnerHTML: { __html: content} } );
			//return create_element( 'span', { className : props.className}, content );
			//return create_element( 'p', { className : props.className }, content );
		}
	} );

}() );