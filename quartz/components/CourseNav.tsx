import { QuartzComponent, QuartzComponentConstructor } from "./types"

export default (() => {
  const CourseNav: QuartzComponent = () => {
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
