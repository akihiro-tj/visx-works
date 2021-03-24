import React from 'react';
import { ScaleSVG } from '@visx/responsive';
import { scaleLinear } from '@visx/scale';
import { Graph } from '@visx/network';
import { Group } from '@visx/group';
import { extent } from 'd3-array';

type Props = {
  data: Data;
  width: number;
  height: number;
  margin?: number;
};

type Data = {
  nodes: NodeDatum[];
  links: LinkDatum[];
};

type NodeDatum = {
  id: string;
  x: number;
  y: number;
};

type LinkDatum = {
  source: string;
  target: string;
};

type NodeProps = {
  node: Node;
};

type LinkProps = {
  link: Link;
};

type Node = NodeDatum;

type Link = {
  source: Node;
  target: Node;
};

const Node: React.FC<NodeProps> = ({ node }) => {
  return (
    <Group>
      <circle x={node.x} y={node.y} r={10} fill="steelblue" />
      <text dx="0.75em">{node.id}</text>
    </Group>
  );
};

const Link: React.FC<LinkProps> = ({ link }) => {
  return (
    <Group>
      <line
        x1={link.source.x}
        x2={link.target.x}
        y1={link.source.y}
        y2={link.target.y}
        stroke="#333"
      />
    </Group>
  );
};

export const Network: React.FC<Props> = ({
  data,
  width,
  height,
  margin = 40,
}) => {
  const xScale = scaleLinear({
    range: [margin, width - margin],
    domain: extent(data.nodes.map((d) => d.x)) as [number, number],
    round: true,
  });

  const yScale = scaleLinear({
    range: [height - margin, margin],
    domain: extent(data.nodes.map((d) => d.y)) as [number, number],
    round: true,
  });

  const nodes: Node[] = data.nodes.map((d) => ({
    id: d.id,
    x: xScale(d.x),
    y: yScale(d.y),
  }));

  const links: Link[] = data.links.map((d) => ({
    source: nodes.find((node) => d.source === node.id) as Node,
    target: nodes.find((node) => d.target === node.id) as Node,
  }));

  const graph = { nodes, links };

  return (
    <ScaleSVG width={width} height={height}>
      <Graph<Link, Node>
        graph={graph}
        nodeComponent={Node}
        linkComponent={Link}
      />
    </ScaleSVG>
  );
};
