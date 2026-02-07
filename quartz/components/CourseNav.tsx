import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default (() => {
  const CourseNav: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
    const links = fileData?.links ?? []
    const prev = links[0]
    const next = links[1]

    return (
      <div class="course-nav">
        <h3>🔗 Links</h3>
        <a href="https://mahesh-puri.github.io/resume/" data-no-router>
          ← Back to Resume / Portfolio
        </a>
      </div>
    )
  }

  return CourseNav
}) satisfies QuartzComponentConstructor
