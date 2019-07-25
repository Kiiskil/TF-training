import * as tf from "@tensorflow/tfjs"

/**
 * https://stats.stackexchange.com/questions/181/how-to-choose-the-number-of-hidden-layers-and-nodes-in-a-feedforward-neural-netw
 * 
 * In sum, for most problems, one could probably get decent performance (even without a second optimization step) by setting 
 * the hidden layer configuration using just two rules: 
 * (i) number of hidden layers equals one; and 
 * (ii) the number of neurons in that layer is the mean of the neurons in the input and output layers. 
 * 
 * Matopeli on luokitteluongelma
 * OUTPUT-Layer
 * - 4 outputs (direction)
 * INPUT-layer
 *  - ? inputs (what worm sees)
 *  - Worm Head? Itself? (inputs grow as worm grows)
 *  - Apple?
 *  - walls?
 *  - Specific area around worm?
 * 
 * One hidden layer
 * -nodes Nh=Ns/((α∗(Ni+No)))
 * 
 * Ni= number of input neurons.
 * No = number of output neurons.
 * Ns = number of samples in training data set.
 * α = an arbitrary scaling factor usually 2-10. 
 * 
 * Others recommend setting alpha to a value between 5 and 10, but I find a value of 2 will often work without overfitting. 
 * You can think of alpha as the effective branching factor or number of nonzero weights for each neuron. Dropout layers will 
 * bring the "effective" branching factor way down from the actual mean branching factor for your network.
 * As explained by this excellent NN Design text, you want to limit the number of free parameters in your model 
 * (its degree or number of nonzero weights) to a small portion of the degrees of freedom in your data. The degrees of freedom in your
 * data is the number samples * degrees of freedom (dimensions) in each sample or Ns∗(Ni+No) (assuming they're all independent). 
 * So α is a way to indicate how general you want your model to be, or how much you want to prevent overfitting.
 * 
 * For an automated procedure you'd start with an alpha of 2 (twice as many degrees of freedom in your training data as your model) 
 * and work your way up to 10 if the error (loss) for your training dataset is significantly smaller than for your test dataset.
 */