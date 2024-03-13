import React from "react";
import './sliding.css';
const Card = (props) => (
    <div className="card">
      <img src={ props.imgUrl } 
        alt={ props.alt || 'Image' } />
      <div className="card-content">
        <h2>{ props.title }</h2>
        <p>{ props.content }</p>
      </div>
    </div>
  );
  
  const CardContainer = (props) => (
    <div className="cards-container">
      {props.cards.map((card) => (
        <Card key={card.id} title={card.title} content={card.description} imgUrl={card.image} />
      ))}
    </div>
  );
  
  
  const AllProjects = () => {
      const cardsData = [
        {
          id: 1,
          image: 'https://via.placeholder.com/400x300',
          title: 'Project 1',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          id: 2,
          image: 'https://via.placeholder.com/400x300',
          title: 'Project 2',
          description: 'Nullam malesuada egestas lectus, ut tincidunt massa aliquet vel.',
        },
        {
          id: 3,
          image: 'https://via.placeholder.com/400x300',
          title: 'Project 3',
          description: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;',
        },
        {
          id: 4,
          image: 'https://via.placeholder.com/400x300',
          title: 'Project 4',
          description: 'Fusce mattis justo eu leo tincidunt, at pharetra justo cursus. Integer nec varius sapien.',
        },
        {
          id: 5,
          image: 'https://via.placeholder.com/400x300',
          title: 'Project 5',
          description: 'Quisque sodales diam id diam maximus, sed convallis mi aliquam.',
        },
        {
          id: 6,
          image: 'https://via.placeholder.com/400x300',
          title: 'Project 6',
          description: 'Praesent sed velit a justo tempor ullamcorper. Ut sed metus et quam interdum viverra at nec ante.',
        },
        {
          id: 7,
          image: 'https://via.placeholder.com/400x300',
          title: 'Project 7',
          description: 'Duis et enim eu sapien efficitur tempor. Maecenas nec tellus placerat, faucibus nisi at, sagittis neque.',
        },
        {
          id: 8,
          image: 'https://via.placeholder.com/400x300',
          title: 'Project 8',
          description: 'Donec elementum purus ac sapien sollicitudin feugiat. Sed nec elit sit amet magna varius tincidunt.',
        },
        {
          id: 9,
          image: 'https://via.placeholder.com/400x300',
          title: 'Project 9',
          description: 'Integer dignissim ex et tellus venenatis, a vehicula ex cursus. Vivamus a risus vel eros tempor tincidunt.',
        },
        {
          id: 10,
          image: 'https://via.placeholder.com/400x300',
          title: 'Project 10',
          description: 'Aenean at dolor at ipsum vestibulum pharetra. Phasellus nec lectus nec magna tempus tincidunt.',
        },
        {
          id: 11,
          image: 'https://via.placeholder.com/400x300',
          title: 'Project 11',
          description: 'Curabitur nec est eget velit rutrum lacinia id sed ex. Nullam vitae elit id lacus accumsan consequat.',
        },
        {
          id: 12,
          image: 'https://via.placeholder.com/400x300',
          title: 'Project 12',
          description: 'Nam vel dui in dui lobortis ultrices. Integer sit amet velit ac orci lacinia aliquam.',
        },
        {
          id: 13,
          image: 'https://via.placeholder.com/400x300',
          title: 'Project 13',
          description: 'Vivamus id odio nec tortor rutrum facilisis. Sed nec diam in sapien mattis congue.',
        },
        {
          id: 14,
          image: 'https://via.placeholder.com/400x300',
          title: 'Project 14',
          description: 'Cras ultrices libero eget neque tempus, eget vehicula nulla tincidunt. Nam nec ante eu mauris tristique euismod.',
        },
        {
          id: 15,
          image: 'https://via.placeholder.com/400x300',
          title: 'Project 15',
          description: 'Aliquam vel leo eget tortor eleifend congue. Nullam mattis ex vitae magna vulputate, at accumsan dolor tristique.',
        },
        {
          id: 16,
          image: 'https://via.placeholder.com/400x300',
          title: 'Project 16',
          description: 'Etiam convallis sem sit amet urna accumsan, sed viverra arcu iaculis. Cras sit amet lorem a eros interdum accumsan.',
        },
        {
          id: 17,
          image: 'https://via.placeholder.com/400x300',
          title: 'Project 17',
          description: 'Phasellus rhoncus lectus quis justo tempor tempus. Mauris vestibulum nulla ut enim tincidunt, sit amet cursus neque feugiat.',
        },
        {
          id: 18,
          image: 'https://via.placeholder.com/400x300',
          title: 'Project 18',
          description: 'Vestibulum in nisi eu magna venenatis dignissim vel vel enim. Nulla tincidunt tortor et tellus gravida, id molestie eros pharetra.',
        },
        {
          id: 19,
          image: 'https://via.placeholder.com/400x300',
          title: 'Project 19',
          description: 'Nunc suscipit arcu sit amet est aliquet, sed vestibulum dolor viverra. Sed non mi sed nunc fermentum congue.',
        },
        {
          id: 20,
          image: 'https://via.placeholder.com/400x300',
          title: 'project 20',
          description: ' Sed nec elit sit amet magna varius tincidunt.',
        },
      ];
      
      return(
        
        <div className="container mx-auto py-16 bg-white">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800">Projects By Organizations</h2>
        <div >
        <CardContainer cards={ cardsData } />
        </div>
      </div>
      );
    }
  
export default AllProjects