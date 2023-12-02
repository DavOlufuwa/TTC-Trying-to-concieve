type ruleType = {
  required: () => boolean
}

const posts = {
  name: "posts",
  title: "Posts",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: ruleType) => Rule.required()
    }, 
    {
      name: "author",
      title: "Author",
      type: "string",
      validation: (Rule: ruleType) => Rule.required()
    }, 
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (Rule: ruleType) => Rule.required(),
      options: {
        source: "title",
        maxLength: 200,
      },
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule: ruleType) => Rule.required()
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      validation: (Rule: ruleType) => Rule.required(),
      options: {
        hotspot: true
      },
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of:[{type : "string"}],
      validation: (Rule: ruleType) => Rule.required()
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule: ruleType) => Rule.required()
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (Rule: ruleType) => Rule.required(),
      options: {
        dateFormat: "YYYY-MM-DD",
        timeFormat: "HH:mm",
      },
      readonly: true, 
    },
  ],
  initialValue: {
    publishedAt: new Date().toISOString(),
  }
}

export default posts