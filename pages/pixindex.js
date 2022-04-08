import dynamic from 'next/dynamic'

const MyStageNoSSR = dynamic(() => import('./pixitext'), {
  ssr: false
});

export default () => (
  <div>
    <MyStageNoSSR/>
  </div>
)