interface CategoryReference {
	_id: string
	title: string
	excerpt?: string
	date?: string
	slug: string
	_type: string
}

interface CategoryProps {
	title: string
	slug: string
}

interface CategoryWithReferences extends CategoryProps {
	_id: string
	_key?: string
	title: string
	slug: string
	references?: CategoryReference[]
}

type CategorySlug = string

interface CategoryParams {
	slug: string
}

export type { 
	CategoryProps as category,
	CategoryWithReferences,
	CategoryReference,
	CategorySlug,
	CategoryParams
}
