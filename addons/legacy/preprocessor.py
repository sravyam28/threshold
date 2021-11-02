import os, sys
import pandas as pd
import numpy as np
from csv import reader, writer

print("=============================================")
print(" THIS PREPROCESSOR IS DEPRECATED! DON'T USE! ")
print("=============================================")

fileName = 'experiment.csv'
if len(sys.argv) > 1:
    fileName = sys.argv[1]

# Transpose
# https://stackoverflow.com/a/58267676/11069914
with open(fileName, encoding='utf-8-sig') as f, open('t_' + fileName,
                                                 'w',
                                                 encoding='utf-8-sig') as fw:
    writer(fw, delimiter=',').writerows(zip(*reader(f, delimiter=',')))

# Make output directory

if not os.path.exists('./conditions'):
    os.makedirs('./conditions')

df = pd.read_csv('t_' + fileName)

# Check parameter spelling
# TODO

# Translate researcher configuration to PsychoPy default
df_keys = df.keys()

df.rename(columns={
    'conditionName': 'label',
    'thresholdBeta': 'beta',
    'thresholdDelta': 'delta',
    'thresholdProbability': 'pThreshold'
},
          inplace=True)

if 'thresholdGuessLogSd' in df_keys:
    # Special case
    # df['startValSd'] = np.log(df['thresholdGuessLogSd'])
    df['startValSd'] = df['thresholdGuessLogSd']  # ?
    df['startVal'] = np.log10(df['thresholdGuess'])

# Export separate files

dataBlockRange = df['block'].unique()
dataBlockRange = dataBlockRange.tolist()

blockCounts = {'block': []}

for i, value in enumerate(dataBlockRange):
    blockCounts['block'].append(i)
    df[df['block'] == value].to_csv('./conditions/block_' + str(value) +
                                         '.csv',
                                         index=False)

df_blockCount = pd.DataFrame(data=blockCounts)
df_blockCount.to_csv('./conditions/blockCount.csv', index=False)
