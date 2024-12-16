import numpy as np
from random import randrange
from copy import deepcopy
import json
import sys

def read_data(file):
    file = json.loads(file)
    return np.array(file['criteriaComparison']), np.array(file['alternativesComparison'])


def write_output(res, errors):
    with open('results.json', 'w') as json_file:
        json.dump(res, json_file, indent=4)
    with open('errors.json', 'w') as json_file:
        json.dump(errors, json_file, indent=4)


def create_criterion(size):
    X = np.ones([size, size])
    numbers = [1 / i for i in range(9, 0, -1)] + [i for i in range(2, 10)]
    for i in range(size):
        for j in range(size):
            if i > j:
                rand_index = randrange(-8, 9)
                X[i][j] *= numbers[8 + rand_index]
                X[j][i] *= numbers[8 - rand_index]
    return X


def create_alternatives(alternatives, criterions):
    X = np.ones([criterions, alternatives, alternatives])
    numbers = [1 / i for i in range(9, 0, -1)] + [i for i in range(2, 10)]
    for c in range(criterions):
        for i in range(alternatives):
            for j in range(alternatives):
                if i > j:
                    rand_index = randrange(-8, 9)
                    X[c][i][j] *= numbers[8 + rand_index]
                    X[c][j][i] *= numbers[8 - rand_index]
    return X


def normalize_3d_matrix(matrix):
    # dziala tak jak powinno
    X = deepcopy(matrix)
    return np.array([normalize_2d_matrix(slice_2d) for slice_2d in X])


def normalize_2d_matrix(matrix):
    X = deepcopy(matrix)
    n = X.shape[0]
    col_sum = np.zeros(n)
    # sumujemu wartosci w kolumanch
    for i in range(n):
        for j in range(n):
            col_sum[j] += X[i][j]
    # dziely przrez sumy
    for i in range(n):
        for j in range(n):
            X[i][j] /= col_sum[j]
    # robimy średnia wierszy
    avg = np.zeros(n)
    for i in range(n):
        for j in range(n):
            avg[i] += X[i][j]
        avg[i] /= n
    return avg


def calculate_final(matrix, criterion):
    X = deepcopy(matrix)
    n = X.shape[1]
    m = X.shape[0]
    res = []
    for alt in range(n):
        sum = 0
        for crit in range(m):
            sum += criterion[crit] * X[crit, alt]
        res.append(sum.item())
    return res


def calculate_consistency_ratio(matrix):
    X = deepcopy(matrix)
    n = X.shape[0]
    if n < 3:
        return 0.0
    priorities = normalize_2d_matrix(X)

    # lamda max
    weighted_sum = np.dot(X, priorities)
    lambda_max = np.mean(weighted_sum / priorities)
    # CI
    CI = (lambda_max - n) / (n - 1)
    # RI
    RI_values = {
        3: 0.58, 4: 0.90, 5: 1.12, 6: 1.24, 7: 1.32, 8: 1.41, 9: 1.45, 10: 1.49
    }
    RI = RI_values.get(n, 1.49)

    # CR
    CR = (CI / RI).item()

    return CR


def find_worst_pairs(matrix, normalized_matrix):
    X = deepcopy(matrix)
    n = X.shape[0]
    inconsistencies = []

    for i in range(n):
        for j in range(n):
            if i > j:
                inconsistency = [abs((normalized_matrix[i] / normalized_matrix[j]) - X[i, j]).item()]
                inconsistency2 = [abs((normalized_matrix[j] / normalized_matrix[i]) - X[j, i]).item()]
                # Zapisujemy parę wraz z sumaryczną niespójnością
                inconsistencies.append([[i, j], max(inconsistency, inconsistency2)])

    # Sortujemy pary według niespójności malejąco
    inconsistencies.sort(key=lambda x: x[1], reverse=True)
    return inconsistencies


def calculate_errors(criterion_matrix, normalized_criterion_vector, alternatives_tensor,
                     normalized_alternatices_matrix):
    output = {}
    output["criteria"] = {"consistency ratio": calculate_consistency_ratio(criterion_matrix),
                          "list of pairs": find_worst_pairs(criterion_matrix, normalized_criterion_vector)}
    for i, alternative in enumerate(alternatives_tensor):
        output[f"alternatives for criterion {i}"] = {"consistency ratio": calculate_consistency_ratio(alternative),
                                                     "list of pairs": find_worst_pairs(alternative,
                                                                                       normalized_alternatices_matrix[
                                                                                           i])}
    return output


if __name__ == "__main__":

    verbose = 0
    criterion_matrix, alternatives_tensor = read_data(sys.argv[1])
    # num_of_criterion = 3
    # num_of_alternatives = 3
    # criterion_matrix = create_criterion(num_of_criterion)
    # alternatives_tensor = create_alternatives(num_of_alternatives, num_of_criterion)

    normalized_criterion_vector = normalize_2d_matrix(criterion_matrix)
    normalized_alternatices_matrix = normalize_3d_matrix(alternatives_tensor)

    final_lternatives_vector = calculate_final(normalized_alternatices_matrix, normalized_criterion_vector)

    errors = calculate_errors(criterion_matrix, normalized_criterion_vector, alternatives_tensor,
                              normalized_alternatices_matrix)

    # write_output(final_lternatives_vector, errors)

    if verbose:
        print(calculate_consistency_ratio(criterion_matrix))

        print("criterion matrix")
        print(criterion_matrix)
        print()

        print("normalized alternatives matrix")
        print(normalized_criterion_vector)
        print()

        print("combined matrix")
        print(alternatives_tensor)
        print()

        print("normalized combined matrix")
        print(normalized_alternatices_matrix)
        print()

        print("final matrix of alternatives")
        print(final_lternatives_vector)
        print()

        print("criterion consistency ratio")
        print(errors)
        print()

    print({"final_alternatives_vector":final_lternatives_vector, "errors":errors})