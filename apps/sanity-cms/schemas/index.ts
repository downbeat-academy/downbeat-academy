// Import Documents
import page from './documents/page'
import person from './documents/person'
import brandAsset from './documents/brandAsset'
import podcast from './documents/podcast'
import article from './documents/article'
import category from './documents/category'
import banner from './documents/banner'
import settings from './documents/settings'
import landingPage from './documents/landingPage'
import navigation from './documents/navigation'
import course from './documents/course'
import curriculum from './documents/curriculum'
import difficulty from './documents/difficulty'
import lesson from './documents/lesson'
import errorPage from './documents/errorPage'
import instrument from './documents/instrument'
import genre from './documents/genre'
import newsletter from './documents/newsletter'
import snippet from './documents/snippet'
import resource from './documents/resource'
import handbook from './documents/handbook'
import linkInBio from './documents/linkInBio'

// Import Objects
import mainImage from './objects/mainImage'
import richText from './objects/richText'
import documentUpload from './objects/documentUpload'
import form from './objects/form/index'
import input from './objects/form/input'
import textarea from './objects/form/textarea'
import audio from './objects/audio'
// import video from './objects/video';
import socialLink from './objects/socialLink'
import metadata from './objects/metadata'
import moduleContent from './objects/moduleContent'
import blockquote from './objects/blockquote'
import fileDownload from './objects/fileDownload'
import handbookReference from './objects/handbook-reference'

// Navigation
import navigationSection from './objects/navigation/section'

// Links
import link from './objects/link'
import customLink from './objects/link/customLink'
import internalLink from './objects/link/internalLink'
import externalLink from './objects/link/externalLink'

// Music Notation Objects
import musicNotation from './objects/music-notation/musicNotation'
import flatNotation from './objects/music-notation/flatNotation'
import inlineChord from './objects/music-notation/inlineChord'
import inlineMusicText from './objects/music-notation/inlineMusicText'
// -- Primitives
import accidental from './objects/music-notation/primitives/accidental'
import musicText from './objects/music-notation/primitives/text'
import rhythmicValue from './objects/music-notation/primitives/rhythmicValue'
import clef from './objects/music-notation/primitives/clef'
import barValue from './objects/music-notation/primitives/barValue'
import musicSymbol from './objects/music-notation/primitives/musicSymbol'
import lexicon from './documents/lexicon'

export const schemaTypes = [
	// Documents
	page,
	person,
	brandAsset,
	podcast,
	article,
	category,
	banner,
	settings,
	landingPage,
	navigation,
	course,
	curriculum,
	difficulty,
	lesson,
	errorPage,
	instrument,
	genre,
	resource,
	newsletter,
	snippet,
	handbook,
	linkInBio,
	lexicon,
	// Objects
	mainImage,
	richText,
	documentUpload,
	form,
	input,
	textarea,
	audio,
	socialLink,
	metadata,
	moduleContent,
	inlineChord,
	inlineMusicText,
	blockquote,
	fileDownload,
	handbookReference,
	link,
	customLink,
	internalLink,
	externalLink,
	navigationSection,
	musicNotation,
	flatNotation,
	accidental,
	musicText,
	rhythmicValue,
	clef,
	barValue,
	musicSymbol,
]
